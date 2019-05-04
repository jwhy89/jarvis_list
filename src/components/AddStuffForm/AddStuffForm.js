import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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
  status_id: 1,
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
                  <br />
                  <label>
                  Stuff Name:
                  <TextField type="text" value={this.state.newStuff.name} placeholder="Stuff Name"
                  onChange={this.handleNameChange('name')} />
                  </label>
                      <br />
                  <label>
                  Description:
                  <TextField type="text" value={this.state.newStuff.description} placeholder="Description"
                  onChange={this.handleNameChange('description')} />
                  </label>
                      <br />
                  <label>
                  Last Used:
                  <TextField type="date" defaultValue={moment().format('YYYY-MM-DD')}
                  // value={this.state.newStuff.last_used}
                  onChange={this.handleNameChange('last_used')} />
                  </label>
                      <br />
                  <label>
                  Price:
                  <TextField type="number" value={this.state.newStuff.price}
                  onChange={this.handleNameChange('price')} />
                  </label>
                      <br />
                  <label>
                  Image URL:
                  <TextField type="url" value={this.state.newStuff.image_url} placeholder="Image URL"
                  onChange={this.handleNameChange('image_url')} />
                  </label>
                      <br />
                  <label>
                  Quantity:
                  <TextField type="text" value={this.state.newStuff.quantity}
                  onChange={this.handleNameChange('quantity')} />
                  </label>
                      <br />
                  <Select value={this.state.newStuff.quantity_type_id}
                  onChange={this.handleNameChange('quantity_type_id')}>
                   <InputLabel selected disabled >Type</InputLabel>
                   {this.props.reduxState.type.map( type => 
                        <MenuItem  value={type.id} key={type.id}>{type.type}</MenuItem>
                   )}
                  </Select>
                  <br />
                  <Select value={this.state.newStuff.physical_or_digital_id}
                  onChange={this.handleNameChange('physical_or_digital_id')}>
                   <InputLabel selected disabled >Physical/Digital</InputLabel>
                   {this.props.reduxState.pd.map( physical_state => 
                        <MenuItem  value={physical_state.id} key={physical_state.id}>{physical_state.physical_state}</MenuItem>
                   )}
                  </Select>
                  <br />
                  <Select value={this.state.newStuff.status_id}
                  onChange={this.handleNameChange('status_id')}>
                   <InputLabel selected disabled >Status</InputLabel>
                   {this.props.reduxState.status.map( status => 
                        <MenuItem  value={status.id} key={status.id}>{status.status}</MenuItem>
                   )}
                  </Select>
                  <br />
                  <Select value={this.state.newStuff.active}
                  onChange={this.handleNameChange('active')} >
                  <InputLabel selected disabled >Active/Inactive:</InputLabel>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                  <button onClick={this.handleSubmit}><AddIcon/>Add New Stuff</button>
              </FormControl>
          </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddStuffForm);