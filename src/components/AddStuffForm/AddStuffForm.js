import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// @material-ui/icons
import AddIcon from "@material-ui/icons/AddBoxRounded";

const moment = require('moment');

// default properties of new stuff
const emptyStuff = {
  name: '',
  description: '',
  last_used: '',
  price: 1,
  image_url: '',
  quantity: 1,
  physical_or_digital_id: 1,
  quantity_type_id: 1,
  status_id: 2,
  active: true
}

class AddStuffForm extends Component {
  state = {
    newStuff: emptyStuff
  }

  // Load tags before rendering
  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_PD'} );
    this.props.dispatch( {type: 'FETCH_STATUS'} );
    this.props.dispatch( {type: 'FETCH_TYPE'} );
  }

  // Called when the input field changes
  handleNameChange = propertyName => {
      return (event) => {
      console.log('event happended')
      this.setState({
        newStuff: {
              ...this.state.newStuff,
              [propertyName]: event.target.value,
        }
    })
  }
  }

  // Called when the submit button is pressed
  handleSubmit = event => {
      event.preventDefault();
      this.props.dispatch({ type: 'ADD_STUFF', payload: this.state.newStuff })
      this.setState({
          ...emptyStuff
    })
  }

  render() {
      return (
          <div>
              <h3>Add stuff:</h3>
              {/* <pre>{JSON.stringify(this.state)}</pre> */}
              <FormControl onSubmit={this.handleSubmit}>
                  <TextField
                    label="Stuff Name"
                    type="text"
                    value={this.state.newStuff.name}
                    onChange={this.handleNameChange('name')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <TextField
                    label="Description"
                    type="text"
                    value={this.state.newStuff.description}
                    onChange={this.handleNameChange('description')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <TextField
                    label="Last Used"
                    type="date"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    // value={this.state.newStuff.last_used}
                    onChange={this.handleNameChange('last_used')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <TextField
                    label="Price $"
                    type="number"
                    value={this.state.newStuff.price}
                    onChange={this.handleNameChange('price')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <TextField
                    label="Image URL"
                    type="url"
                    value={this.state.newStuff.image_url}
                    onChange={this.handleNameChange('image_url')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <TextField
                    label="Quantity"
                    type="number"
                    value={this.state.newStuff.quantity}
                    onChange={this.handleNameChange('quantity')}
                    margin="dense"
                    variant="filled"
                  />
                  <br />
                  <Select 
                    value={this.state.newStuff.quantity_type_id}
                    onChange={this.handleNameChange('quantity_type_id')} >
                      <InputLabel selected disabled >Type</InputLabel>
                        {this.props.reduxState.type.map( type => 
                          <MenuItem value={type.id} key={type.id}>{type.type}</MenuItem>
                        )}
                  </Select>
                  <br />
                  <Select
                    value={this.state.newStuff.physical_or_digital_id}
                    onChange={this.handleNameChange('physical_or_digital_id')}>
                      <InputLabel selected disabled >Physical/Digital</InputLabel>
                        {this.props.reduxState.pd.map( physical_state => 
                          <MenuItem value={physical_state.id} key={physical_state.id}>{physical_state.physical_state}</MenuItem>
                        )}
                  </Select>
                  <br />
                  <Select
                    value={this.state.newStuff.status_id}
                    onChange={this.handleNameChange('status_id')}>
                      <InputLabel selected disabled >Status</InputLabel>
                        {this.props.reduxState.status.map( status => 
                          <MenuItem value={status.id} key={status.id}>{status.status}</MenuItem>
                        )}
                  </Select>
                  <br />
                  <Select
                    value={this.state.newStuff.active}
                    onChange={this.handleNameChange('active')} >
                      <InputLabel selected disabled >Active/Inactive:</InputLabel>
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                  <br />
                  <Button
                    variant="contained"
                    style={{ backgroundColor: 'orange' }}
                    onClick={this.handleSubmit}><AddIcon/>Add New Stuff</Button>
              </FormControl>
          </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddStuffForm);