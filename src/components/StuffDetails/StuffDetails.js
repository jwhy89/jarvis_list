import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class StuffDetails extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id })
  }

  deleteStuff = () => {
    this.props.dispatch({ type: 'DELETE_STUFF', payload: this.props.reduxState.details.id })
    this.props.history.push('/');
    console.log('in delete stuff', this.props.reduxState.details.id)
  }

  render() {
    const stuff = this.props.reduxState.details;
    console.log(this.props.reduxState.details)
    return (
      <div>
        <h1>{stuff.stuff_name}</h1>
        <ul>
          <li>ID: {stuff.id}</li>
          <li>Stuff Name: {stuff.stuff_name}</li>
          <li>Description: {stuff.description}</li>
          <li>Quantity: {stuff.quantity}</li>
          <li>Type: {stuff.type}</li>
          <li>Physical State: {stuff.physical_state}</li>
        </ul>
        <button onClick={() => this.deleteStuff()}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default withRouter(connect(mapStateToProps)(StuffDetails));