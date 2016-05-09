import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmPlan,
         deleteFromBuilder,
         reorderUp,
         reorderDown,
         changingRoutes } from '../actions';
// import { buildPlanner } from '../../redux/reducers';
import PlanBuilderItem from '../components/PlanBuilderItem';
import Maps from '../components/Maps'; //TODO: needs updating
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';

class PlanBuilderContainer extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // }

  goToConfirm() {
    dispatch(push('/confirmation'));
  }

  render() {
    console.log(this.props);
    const { activities } = this.props;

    const hasActivities = activities.length > 0;
    const nodes = !hasActivities ?
      <em>Start building your itinerary here!</em> :
      <div>
        <div>
        {activities.map((activity, i) =>
          <PlanBuilderItem
            key={i}
            activity={activity}
            onDeleteFromBuilderClicked={() => this.props.deleteFromBuilder(activity)}
            onMoveUpClicked={() => {
              this.props.reorderUp(activities.indexOf(activity));
              changingRoutes(activities);
            }}
            onMoveDownClicked={() => {
              this.props.reorderDown(activities.indexOf(activity));
              changingRoutes(activities);
            }}/>
        )}
        </div>
      </div>
    return (
     <div className="col-md-6">
        <div className="row" style={{marginBottom: 10}}>
          <Maps size="small" />
        </div>
        <Card>
          <h3 style={{marginLeft: 15}}>Itinerary</h3>
          {nodes}
          <div style={{marginBottom: 10}}>
            <FlatButton
              label="Confirm"
              onClick={() => this.goToConfirm()}
              style={{position: "relative", float: "right"}}
              disabled={hasActivities ? false : true} />
          </div>
        </Card>
      </div>
    )
  }
}

// PlanBuilderContainer.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     city: PropTypes.string
//   })).isRequired,
//   confirmPlan: PropTypes.func.isRequired
// }

const mapStateToProps = (state) => {
  return {
    activities: state.planBuilder ? state.planBuilder : [],
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanBuilderContainer);
