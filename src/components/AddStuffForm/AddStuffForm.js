import React, {Component} from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';

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
              <form onSubmit={this.handleSubmit}>
                  <br />
                  <label>
                  Stuff Name:
                  <TextField type="text" value={this.state.newStuff.name}
                  onChange={this.handleNameChange('name')} />
                  </label>
                      <br />
                  <label>
                  Description:
                  <TextField type="text" value={this.state.newStuff.description}
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
                  <TextField type="url" value={this.state.newStuff.image_url}
                  onChange={this.handleNameChange('image_url')} />
                  </label>
                      <br />
                  <label>
                  Quantity:
                  <TextField type="text" value={this.state.newStuff.quantity}
                  onChange={this.handleNameChange('quantity')} />
                  </label>
                      <br />
                  <select onChange={this.handleNameChange('quantity_type_id')}>
                   <option selected disabled >Type</option>
                   {this.props.reduxState.type.map( type => 
                        <option  value={type.id} key={type.id}>{type.type}</option>
                   )}
                  </select>
                  <br />
                  <select onChange={this.handleNameChange('physical_or_digital_id')}>
                   <option selected disabled >Physical/Digital</option>
                   {this.props.reduxState.pd.map( physical_state => 
                        <option  value={physical_state.id} key={physical_state.id}>{physical_state.physical_state}</option>
                   )}
                  </select>
                  <br />
                  <select onChange={this.handleNameChange('status_id')}>
                   <option selected disabled >Status</option>
                   {this.props.reduxState.status.map( status => 
                        <option  value={status.id} key={status.id}>{status.status}</option>
                   )}
                  </select>
                  <br />
                  <label>
                  Active/Inactive:
                  <TextField type="text" value={this.state.newStuff.active}
                  onChange={this.handleNameChange('active')} />
                  </label>
                  <input type='submit' value='Add New Stuff' />
              </form>
          </div>
      );
  }
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(AddStuffForm);