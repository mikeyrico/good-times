import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Modal from 'react-modal';
import Maps from './Maps';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export class ActivityItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      buttonClicked: false,
      activity: {}
    };
  }

  componentWillMount() {
    console.log('state',this.state.activity);
    console.log('props', this.props.activity);
    this.setState({
      activity: this.props.activity
    });
    console.log('state again',this.state.activity);
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
    // const { activity } = this.props;
    // this.props;
    return (
      <Card>
        <CardHeader
          title={this.state.activity.title}
          subtitle={this.state.activity.neighborhood}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <FlatButton
          onClick={this.clickAddButton.bind(this)}
          disabled={this.state.activity.added ? true : false}
          label={this.state.activity.added ? 'Added' : 'Add to itinerary'} />
        <img src='../assets/open.png' onClick={this.toggleModal.bind(this)} />
        <CardText expandable={true}>
          {this.state.activity.desc}
        </CardText>
        <Modal
          isOpen={this.state.modalOpen}
          style={customStyles} >
          <div className="container">
            <div className="row">
              <div>
                <FlatButton
                  onClick={this.toggleModal.bind(this)}
                  label="Close Map" />
              </div>
              <Maps size="small" lat={this.state.activity.lat} long={this.state.activity.long} title={this.state.activity.title} />
            </div>
          </div>
        </Modal>
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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
