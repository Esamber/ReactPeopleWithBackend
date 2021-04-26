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
        isEditMode: false,
        checkedPeople: []
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

    onDeleteClick = (p) => {
        axios.post('/api/people/delete', p).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data
                })
            })
        })
    }

    onEditClick = (p) => {
        this.setState({ isEditMode: true, person: p });
    }

    onUpdateClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/update', this.state.person).then(() => {
            axios.get('/api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },
                    isAdding: false,
                    isEditMode: false
                });
            });
        });
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

    onCheckBoxChange = (checkedP) => {
        if (this.state.checkedPeople.find(p => p.id === checkedP.id))  {
            this.setState({ checkedPeople: [...this.state.checkedPeople, checkedP] })
        } else {
            let filteredArray = this.state.checkedPeople.filter(p => p.id !== checkedP.id);
            this.setState({ checkedPeople: filteredArray });
        }
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/deleteall', this.state.checkedPeople).then(() => {
            axios.get('api/people/getpeople').then(({ data }) => {
                this.setState({
                    people: data,
                    checkedPeople: []
                })
            })
        })
    }

    render() {
        const { people, person, isAdding, checkedPeople } = this.state;
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
                    onUpdateClick={() => this.onUpdateClick(person)}
                    onCancelClick={this.onCancelClick}
                />
                <br/>
                <hr />
                <br/>
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <button className="btn btn-danger btn-block" onClick={this.onDeleteAllClick}>Delete All</button>
                            </th>
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
                                onEditClick={() => this.onEditClick(p)}
                                onDeleteClick={() => this.onDeleteClick(p)}
                                onCheckBoxChange={() => this.onCheckBoxChange(p)}
                                isChecked={checkedPeople.includes(p)}
                            />
                        })}
                    </tbody>
                </table>
            </div>
         );
    }
}
export default PeopleTable;