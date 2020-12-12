import React, { Component } from 'react';

import classes from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
    state = {
        persons: [
            { id: "acdsf", name: "Simon", age: 12 },
            { id: "dfefa", name: "Julien", age: 12 },
            { id: "dfefae", name: "Leo", age: 15 },
        ],
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        isAuthenticated: false,
    }

    componentDidMount() {
        console.log("[App.js] componentDidMount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[App.js] shouldComponentUpdate");
        return true;
    }

    componentDidUpdate() {
        console.log("[App.js] componentDidUpdate");
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => p.id === id);

        const person = { ...this.state.persons[personIndex] };
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState((prevState, props) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        })
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

    loginHandler = () => {
        this.setState({ isAuthenticated: true });
    }

    render() {
        let persons = null;

        if (this.state.showPersons) {
            persons = <Persons
                persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler} />
        }

        return (
            <Aux>
                <button
                    onClick={() => { this.setState({ showCockpit: false }) }}>
                    Toggle Cockpit
                </button>
                <AuthContext.Provider
                    value={{
                        authenticated: this.state.isAuthenticated,
                        login: this.loginHandler
                    }}>
                    {this.state.showCockpit ? <Cockpit
                        clicked={this.togglePersonsHandler}
                        personsLength={this.state.persons.length}
                        showPersons={this.state.showPersons} /> : null}
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, classes.App);
