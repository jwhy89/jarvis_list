import React, {Component} from 'react';
import { connect } from 'react-redux';

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

 // load tags before rendering
  componentDidMount() {
    this.props.dispatch( {type: 'FETCH_PD'} );
    this.props.dispatch( {type: 'FETCH_STATUS'} );
    this.props.dispatch( {type: 'FETCH_TYPE'} );
  }
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
              <pre>{JSON.stringify(this.state)}</pre>
              <form onSubmit={this.handleSubmit}>
                  <br />
                  <label>
                  Name:
                  <input type="text" value={this.state.newStuff.name}
                  onChange={this.handleNameChange('name')} />
                  </label>
                      <br />
                  <label>
                  Description:
                  <input type="text" value={this.state.newStuff.description}
                  onChange={this.handleNameChange('description')} />
                  </label>
                      <br />
                  <label>
                  Last Used:
                  <input type="date" value={this.state.newStuff.last_used}
                  onChange={this.handleNameChange('last_used')} />
                  </label>
                      <br />
                  <label>
                  Price:
                  <input type="number" value={this.state.newStuff.price}
                  onChange={this.handleNameChange('price')} />
                  </label>
                      <br />
                  <label>
                  Image URL:
                  <input type="url" value={this.state.newStuff.image_url}
                  onChange={this.handleNameChange('image_url')} />
                  </label>
                      <br />
                  <label>
                  Quantity:
                  <input type="text" value={this.state.newStuff.quantity}
                  onChange={this.handleNameChange('quantity')} />
                  </label>
                      <br />
                  {/* <label>
                  Type:
                  <input type="text" value={this.state.newStuff.quantity_type_id}
                  onChange={this.handleNameChange('quantity_type_id')} />
                  </label> */}
                  <select onChange={this.handleNameChange('quantity_type_id')}>
                   <option selected disabled >Type</option>
                   {this.props.reduxState.type.map( type => 
                        <option  value={type.id} key={type.id}>{type.type}</option>
                   )}
                  </select>
                  <br />
                  {/* <label>
                  Physical or Digital:
                  <input type="text" value={this.state.newStuff.physical_or_digital_id}
                  onChange={this.handleNameChange('physical_or_digital_id')} />
                  </label> */}
                  <select onChange={this.handleNameChange('physical_or_digital_id')}>
                   <option selected disabled >Physical/Digital</option>
                   {this.props.reduxState.pd.map( physical_state => 
                        <option  value={physical_state.id} key={physical_state.id}>{physical_state.physical_state}</option>
                   )}
                  </select>
                  <br />
                  {/* <label>
                  Status:
                  <input type="text" value={this.state.newStuff.status_id}
                  onChange={this.handleNameChange('status_id')} />
                  </label> */}
                  <select onChange={this.handleNameChange('status_id')}>
                   <option selected disabled >Status</option>
                   {this.props.reduxState.status.map( status => 
                        <option  value={status.id} key={status.id}>{status.status}</option>
                   )}
                  </select>
                  <br />
                  <label>
                  Active/Inactive:
                  <input type="text" value={this.state.newStuff.active}
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