import {
  ADD_TO_BUILDER,
  DELETE_FROM_BUILDER,
  REORDER_UP,
  REORDER_DOWN
} from '../constants'
import {
  changingRoutes
} from '../actions'

const intitialState = {
  activities: null,

};


export default createReducer(initialState, {
  [ADD_TO_BUILDER]: (state, payload) => {
    return Object.assign({}, state, {
      activities: state.activities.concat[payload.activity];
    });
  },
  [DELETE_FROM_BUILDER]: (state, payload) => {
    return Object.assign({}, state, {
    });
  },
  [REORDER_UP]: (state, payload) => {
    return Object.assign({}, state, {
    });
  },
  [REORDER_DOWN]: (state, payload) => {
    return Object.assign({}, state, {
    });
  },
})

// export function planBuilder(state = [], action) {
//   switch (action.type) {
//     case ADD_TO_BUILDER:
//       var newState = state.slice();
//       newState.push(action.activity);
//       changingRoutes(newState);
//       return newState;
//     case DELETE_FROM_BUILDER:
//       var newState = state.slice();
//       var activityIndex = state.indexOf(action.activity);
//       newState.splice(activityIndex, 1);
//       if (newState.length > 0) {

//         changingRoutes(newState);
//       }
//       return newState;
//     case REORDER_UP:
//       if (action.activityIndex === 0) {
//         return state;
//       } else {
//         var newState = state.slice();
//         var index = action.activityIndex;
//         var newIndex = action.activityIndex - 1;
//         newState[index] = newState.splice(newIndex, 1, newState[index])[0];
//         return newState;
//       }
//     case REORDER_DOWN:
//       if (action.activityIndex === state.length - 1) {
//         return state;
//       } else {
//         var newState = state.slice();
//         var index = action.activityIndex;
//         var newIndex = action.activityIndex + 1;
//         newState[index] = newState.splice(newIndex, 1, newState[index])[0];
//         return newState;
//       }
//     default:
//       return state
//   }
// }