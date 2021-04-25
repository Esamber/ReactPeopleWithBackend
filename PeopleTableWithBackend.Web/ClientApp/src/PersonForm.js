import React from 'react';
import axios from 'axios';

class PersonForm extends React.Component {
    render() {
        const { person, isEditMode, onFirstNameChange, onLastNameChange, onAgeChange, onUpdateClick, onCancelClick, onAddClick } = this.props;
        return (
            <div className="row jumbotron">
                <div className="col-md-3">
                    <input type="text" className="form-control" value={person.firstName} onChange={onFirstNameChange} placeholder="First Name" name="firstName" />
                </div>
                <div className="col-md-3">
                    <input type="text" className="form-control" value={person.lastName} onChange={onLastNameChange} placeholder="Last Name" name="lastName" />
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" value={person.age} onChange={onAgeChange} placeholder="Age" name="age" />
                </div>
                <div className="col-md-3">
                    {!isEditMode && <button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button>}
                    {!!isEditMode && <button className="btn btn-warning btn-block" onClick={onUpdateClick}>Update</button>}
                    {!!isEditMode && <button className="btn btn-info btn-block" onClick={onCancelClick}>Cancel</button>}
                </div>
             </div>
        )
    }
}
export default PersonForm;