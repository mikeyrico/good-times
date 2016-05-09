import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Dialog from 'material-ui/Dialog';
import Maps from './Maps';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      buttonClicked: false,
      // activity: {}
    };
  }

  componentWillMount() {
    // console.log('state',this.state.activity);
    // console.log('props', this.props.activity);
    // this.setState({
    //   activity: this.props.activity
    // });
    // console.log('state again',this.state.activity);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  clickAddButton() {
    this.setState({
      buttonClicked: !this.state.buttonClicked
    });
    this.props.onAddToBuilderClicked();
  }

  render() {
    const { activity } = this.props;
    console.log('activity in activity item is:', activity);
    return (
      <Card style={{marginLeft: 10, marginRight: 10, marginBottom: 10}}>
        <CardHeader
          title={activity.title}
          subtitle={activity.neighborhood.join(', ')}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <FlatButton
          onClick={this.clickAddButton.bind(this)}
          disabled={activity.added ? true : false}
          label={activity.added ? 'Added' : 'Add to itinerary'} />
        <img src='../assets/open.png' onClick={this.toggleModal.bind(this)} />
        <CardText expandable={true}>
          {activity.desc}
        </CardText>
         <Dialog
          open={this.state.modalOpen}
          modal={true}
          style={customContentStyle} >
          <div className="container">
            <div className="row">
              <div>
                <FlatButton
                  onClick={this.toggleModal.bind(this)}
                  label="Close Map" />
              </div>
              <Maps size="small" lat={activity.lat} long={activity.long} title={activity.title} />
            </div>
          </div>
        </Dialog>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityItem);

// ActivityItem.propTypes = {
//   activity: React.PropTypes.shape({
//     title: React.PropTypes.string.isRequired,
//     desc: React.PropTypes.string.isRequired,
//     city: React.PropTypes.string.isRequired,
//   }).isRequired,
//   onAddToBuilderClicked: React.PropTypes.func.isRequired
// }

const customContentStyle = {
  width: '60%',
  maxWidth: 'none'
};
