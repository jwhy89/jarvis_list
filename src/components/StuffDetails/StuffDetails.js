import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// @material-ui/icons
import Deleted from "@material-ui/icons/DeleteOutlineRounded";
import EditIcon from "@material-ui/icons/EditRounded";
import UpdateIcon from "@material-ui/icons/DoneRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";

const moment = require('moment');

class StuffDetails extends Component {

  state = {
    currentlyEditing: false,
      editStuff: {},
  }

  // function to get details from database and redux state before rendoring
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.id })
    console.log('in componentdidmount', this.props.reduxState.details);
  }

  // async issue with componentDidMount
  // used to pull stuff details into current state in component
  componentDidUpdate(prevProps) {
    if (this.props.reduxState.details !== prevProps.reduxState.details) {
      this.setState({
        editStuff: {
          name: this.props.reduxState.details.name,
          description: this.props.reduxState.details.description,
          last_used: moment(this.props.reduxState.details.last_used).format('YYYY-MM-DD'),
          price: this.props.reduxState.details.price,
          image_url: this.props.reduxState.details.image_url,
          quantity: this.props.reduxState.details.quantity,
          physical_or_digital_id: this.props.reduxState.details.physical_or_digital_id,
          quantity_type_id: this.props.reduxState.details.quantity_type_id,
          status_id: this.props.reduxState.details.status_id,
          active: this.props.reduxState.details.active,
          id: this.props.reduxState.details.id,
      }
      })
    }
  }

  // function to delete stuff from database
  deleteStuff = () => {
    this.props.dispatch({ type: 'DELETE_STUFF', payload: this.props.reduxState.details.id })
    this.props.history.push('/');
    console.log('in delete stuff', this.props.reduxState.details.id)
  }

  // called when clicked on; will allow user to edit pre-populated field from reduxState
  handleEdit = (event) => {
    console.log('in handleEdit');
    let stuffId = event.currentTarget.value;
    console.log(stuffId);
    this.setState({
      currentlyEditing: true,
    })
    console.log(this.state.currentlyEditing);
  }

  // Called when the submit button is pressed
  // PUT request to database
  handleEditSubmit = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
    this.props.dispatch({type:'EDIT_DETAILS', payload: this.state.editStuff});
  }

  // Called when the submit button is pressed
  // PUT request to database
  handleEditCancel = (event) => {
    console.log('in handleEditSubmit');
    this.setState({
        currentlyEditing: false,
    })
  }

  // Called when the input field changes
  handleChange = propertyName => {
    return(event) =>{
    
    this.setState({
        editStuff: {
            ...this.state.editStuff,
            [propertyName]: event.target.value,
        }
    });
    }
  }

  render() {
    const stuff = this.props.reduxState.details;
    console.log(this.state.editStuff.name)
    // console.log(this.state.editStuff)
    return (
      <Grid container
      direction="row"
      justify="center"
      alignItems="stretch">
      <Grid item
        xs={12}
        sm={10}
        md={8}
        lg={6}>
        <Grid container
          direction='column'
          justify='space-between'
          alignItems='stretch'
          spacing={16}
        >
          <Grid item>
            {/* <h1>{JSON.stringify(this.props.reduxState.details.name)}</h1> */}
            <h1 style={{textAlign: 'center'}}>{stuff.name}</h1>
            { this.state.currentlyEditing === true ? 
              <>
              <Button variant="contained" onClick={this.handleEditSubmit}><UpdateIcon/>Update</Button>  
              <Button variant="contained" onClick={this.handleEditCancel}><CancelIcon/>Cancel</Button>
              </> :
              <Button variant="contained" onClick={this.handleEdit}><EditIcon/>Edit</Button>
            }
          </Grid>
          <Grid item>
            <img src={stuff.image_url} alt={stuff.name}
             style={{width: '100%', height: 400, diplay: 'flex'}}/>
          </Grid>
          <Grid item>
              <><span>ID: {stuff.id}</span><br /></>
              {this.state.currentlyEditing === true ?
              <>
              <TextField onChange={this.handleChange('name')} defaultValue={`${stuff.name}`}/>
              <br />
              </> :
              <><span>Stuff Name: {stuff.name}</span><br /></>}
              {this.state.currentlyEditing === true ?
              <>
              <TextField onChange={this.handleChange('description')} defaultValue={`${stuff.description}`}/>
              <br />
              </> :
              <><span>Description: {stuff.description}</span><br /></>}
              {this.state.currentlyEditing === true ?
              <>
              <TextField
                type="number"
                onChange={this.handleChange('quantity')}
                defaultValue={`${stuff.quantity}`}/>
              <br />
              </> :
              <><span>Quantity: {stuff.quantity}</span><br /></>}
              <><span>Type: {stuff.type}</span><br /></>
              <><span>Physical State: {stuff.physical_state}</span><br /></>
          </Grid>
            <Button variant="contained" onClick={() => this.deleteStuff()}><Deleted/>Delete</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});

export default withRouter(connect(mapStateToProps)(StuffDetails));