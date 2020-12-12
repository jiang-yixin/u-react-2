import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
    componentDidMount() {
        console.log("[Persons.js] componentDidMount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Persons.js] shouldComponentUpdate");
        return nextProps.persons !== this.props.persons;
    }

    componentDidUpdate() {
        console.log("[Persons.js] componentDidUpdate");
    }

    render() {
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={event => this.props.changed(event, person.id)}
            />
        })
    }
}

export default Persons;