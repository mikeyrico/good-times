import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import ActivitiesContainer from '../containers/ActivitiesContainer';
import FilterContainer from '../components/ActivityItem';
import PlanBuilderContainer from '../components/ActivityList';

export class ActivitiesView extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <FilterContainer />
          <ActivitiesContainer />
          <PlanBuilderContainer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activities: state.activities,
    planBuilder: state.planBuilder
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitiesView);
