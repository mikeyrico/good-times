import { checkHttpStatus, parseJSON } from '../utils';
import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} from '../constants';
import { pushState } from 'redux-router';

export function initApp() {
  return dispatch => {
    console.log('ready to receive activities');
  };
}

export function receiveActivities(activities) {
  return {
    type: types.RECEIVE_ACTIVITIES,
    payload: {
      activities: activities
    }
  }
}

export function receiveRoutes(route) {
  return {
    type: types.RECEIVE_ROUTES,
    directions: route
  };
}

export function changeRoutes(route) {
  return {
    type: types.CHANGE_ROUTES,
    directions: route
  };
}

export function getAllActivities(query) {

    fetch(`/api/yelpSearch?city=${query.city}&category=${query.category}`, {
      method: 'GET'
    })
    .then((results) => results.json())
    .then((data) =>
       data.map((activity) => {
         let transformed = Object.create(null);

         // transformed.yelpRating = activity.rating;
         transformed.title = activity.name;
         transformed.category = activity.categories[0];
         transformed.desc = activity.snippet_text;
         transformed.lat = activity.location.coordinate.latitude;
         transformed.long = activity.location.coordinate.longitude;
         transformed.address = activity.location.address[0];
         transformed.city = activity.location.city;
         transformed.state = activity.location.state_code;
         transformed.neighborhood = activity.location.neighborhoods;
         transformed.added = false;
         // TODO: cannot figure out how to pull a single item from neighborhood array, will have to be handled on client side

         return transformed;
       }))
    .then((yelpData) => {
      console.log('yelpData: ', yelpData);
      return fetch('https://sleepy-crag-32675.herokuapp.com/v1/activities', {
        method: 'GET'
      })
      .then((dbResults) => dbResults.json())
      .then((dbJson) => dbJson.data.map((item) => Object.assign(item, {added: false})))
      .then((dbArray) => dbArray.concat(yelpData))
      .then((dbActivities) => {
        store.dispatch(receiveActivities(dbActivities));
        dispatch(push('/activities'));
      })
    })
    .catch(e => console.log(e));
}

export function addToBuilder(activity) {
  return {
    type: types.ADD_TO_BUILDER,
    activity
  };
}

export function deleteFromBuilder(activity) {
  return {
    type: types.DELETE_FROM_BUILDER,
    payload: {
      activity: activity
    }
  };
}

export function confirmPlan(activities) {
  return {
    type: types.CONFIRM_REQUEST,
    activities
  };
}

export function reorderUp(activityIndex) {
  return {
    type: types.REORDER_UP,
    activityIndex
  }
}

export function reorderDown(activityIndex) {
  return {
    type: types.REORDER_DOWN,
    activityIndex,
  }
}

export function saveToDb(activities) {
  return {
    type: types.SAVE_TO_DB,
    activities
  };
}

// map stuff
export function changingRoutes(activities) {
  const DirectionsService = new google.maps.DirectionsService();

  if (activities.length === 0) {
    return store.dispatch(changeRoutes(null));
  }

  var places = activities.map(function(item) {
    return {position: {location: {lat: parseFloat(item.lat), lng: parseFloat(item.long) }}, title: item.title, address: [item.address, item.city, item.state].join(', ') };
  });

  DirectionsService.route(
    {
      origin: places[0].address,
      destination: places[places.length-1].address,
      waypoints: places.slice(1,-1).map((item) => item.position),
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        return store.dispatch(changeRoutes(result));
      } else {
        console.error(`error fetching directions ${ result }`);
        return store.dispatch(changeRoutes(null));
      }
  });
}


export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  console.log(error);
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
      type: LOGOUT_USER
    }
}

// pay attention to this fn signature...
// appear returns a function that takes dispatch as a param
export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(pushState(null, '/'));
    }
}

export function loginUser(username, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        console.log('username is:', username, 'password is:', password);
        return fetch('http://localhost:8080/v1/access_tokens', {
            method: 'POST',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({username: username, password: password,grant_type: 'password'})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                console.log('response token is:', response.data[0]);
                try {
                    dispatch(loginUserSuccess(response.data[0]));
                    dispatch(pushState(null, redirect));
                } catch (e) {
                    console.log(e);
                    dispatch(loginUserFailure({
                        response: {
                          status: 403,
                          statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
               console.log('>>>>', error);
               let response = {
                status: 401,
                statusText: `Unauthorized`
               };
               let resError = Object.assign({}, {
                response: response
              });
               dispatch(loginUserFailure(resError));
            })
    }
}

export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  }
}

export function fetchProtectedData(token) {

    // return (dispatch, state) => {
    //     dispatch(fetchProtectedDataRequest());
    //     return fetch('http://localhost:8080/v1/plans', {
    //             credentials: 'include',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         .then(checkHttpStatus)
    //         .then(parseJSON)
    //         .then(response => {
    //             dispatch(receiveProtectedData(response.data));
    //         })
    //         .catch(error => {
    //             if(error.response.status === 401) {
    //               dispatch(loginUserFailure(error));
    //               dispatch(pushState(null, '/login'));
    //             }
    //         })
    //    }
}

