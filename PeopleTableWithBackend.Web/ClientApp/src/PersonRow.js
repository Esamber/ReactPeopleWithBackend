import React from 'react';

class PersonRow extends React.Component {

    render() {
        const { person, onEditClick, onDeleteClick, onCheckboxChange, isChecked } = this.props;
        return (
            <tr key={person.id}>
                {/*<td>
                    <input type="checkbox" className="form-check form-control" onChange={onCheckboxChange} checked={isChecked} />
                </td>*/}
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.age}</td>
                <td>
                    <button type="button" className="btn btn-warning" onClick={onEditClick}>Edit</button>
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
                </td>
            </tr>
        );
    }
}
export default PersonRow;