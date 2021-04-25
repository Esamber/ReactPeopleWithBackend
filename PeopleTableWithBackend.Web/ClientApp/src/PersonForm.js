import React from 'react';
import axios from 'axios';

class PersonForm extends React.Component {
    render() {
        return (
            <div className="row jumbotron">
                <div className="col-md-3">
                    <input type="text" className="form-control" value={this.props.person.firstName} onChange={this.props.onFirstNameChange} placeholder="First Name" name="firstName" />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" value={this.props.person.lastName} onChange={this.props.onLastNameChange} placeholder="Last Name" name="lastName" />
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" value={this.props.person.age} onChange={this.props.onAgeChange} placeholder="Age" name="age" />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary btn-block" onClick={this.props.onAddClick}>Add</button>
                </div>
             </div>
        )
    }
}
export default PersonForm;