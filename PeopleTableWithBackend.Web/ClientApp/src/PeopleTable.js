import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import PersonRow from './PersonRow';
import PersonForm from './PersonForm'

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isAdding: false,
        isEditMode: false
    }

    componentDidMount = () => {
        axios.get('/api/people/getpeople').then(({ data }) => {
            this.setState({ people: data });
        });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddClick = () => {
        console.log(this.state);
        this.setState({ isAdding: true });
        axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },
                    isAdding: false
                });
            });
        });
    }

    onDeleteClick = (e) => {
        vconsole.log(e.target.id)
        axios.post('/api/people/delete', e.target.id).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data
                })
            })
        })
    }

    onEditClick = (selectedPerson) => {
        this.setState({ isEditMode: true, person: selectedPerson });
    }

    onUpdateClick = () => {

    }

    onCancelClick = () => {
        this.setState({
            person: {
                id: '',
                firstName: '',
                lastName: '',
                age: ''
            },
            isEditMode: false
        })
    }

    render() {
        const { people, person, isAdding } = this.state;
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <PersonForm
                    isAdding={isAdding}
                    person={person}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isEditMode={this.state.isEditMode}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />
                <br/>
                <hr />
                <br/>
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((p) => {
                            return <PersonRow
                                person={p}
                                key={p.id}
                                onEditClick={this.onEditClick}
                                onDeleteClick={this.onDeleteClick}
                            />
                        })}
                    </tbody>
                </table>
            </div>
         );
    }
}
export default PeopleTable;