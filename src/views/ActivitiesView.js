import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CreateActivity from '../components/CreateActivity';
import ActivityItem from '../components/ActivityItem';
import ActivitiesList from '../components/ActivityList';

import FlatButton from 'material-ui/FlatButton';


class ActivitiesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    const { activities } = this.props;
    // console.log('>>>activities:,', activities.activities);
    var that = this;

    return (
      <div className="col-md-6">

        <CreateActivity modal={this.state.modalOpen} toggleModal={this.toggleModal.bind(this)}/>
        <ActivitiesList title="Activities">
        <FlatButton label="Create New Activity" onClick={this.toggleModal.bind(this)} />
          {activities.activities.map((activity, i) =>
            <ActivityItem
              key={i}
              activity={activity}
              onAddToBuilderClicked={() => this.props.addToBuilder(activity)}
            />
          )}
        </ActivitiesList>
      </div>
    )
  }
}

// ActivitiesContainer.propTypes = {
//   activities: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     title: PropTypes.string.isRequired,
//     desc: PropTypes.string.isRequired,
//     city: PropTypes.string.isRequired
//   })).isRequired,
//   addToBuilder: PropTypes.func.isRequired
// }

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
)(ActivitiesContainer);
