import React, { Component } from 'react';

import classes from './App.css';

import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: "acdsf", name: "Simon", age: 12 },
            { id: "dfefa", name: "Julien", age: 12 },
            { id: "dfefae", name: "Leo", age: 15 },
        ],
        showPersons: true
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);

        const person = { ...this.state.persons[personIndex] };
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons: persons });
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({ persons: persons });
    }

    togglePersonsHandler = () => {
        const showPersons = this.state.showPersons;
        this.setState({ showPersons: !showPersons });
    }

    render() {
        let persons = null;
        let btnClasses = '';

        console.log('classes ', classes);

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={event => this.nameChangedHandler(event, person.id)}
                        />
                    })}
                </div>
            );

            btnClasses = classes.Red;
        }

        let assignedClasses = [];
        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }

        return (
            <div className={classes.App}>
                <button className={btnClasses} onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </button>
                <p className={assignedClasses.join(' ')} >It works !!</p>
                {persons}
            </div>
        );
    }
}

export default App;
