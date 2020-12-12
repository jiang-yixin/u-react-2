import React, { Component } from 'react';
import PropTypes from 'prop-types'

import withClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import AuthContext from '../../../context/auth-context';

import classes from './Person.css';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext; // name should be contextType

    componentDidMount() {
        console.log("[Person.js] componentDidMount");
        this.inputElementRef.current.focus();
    }

    componentDidUpdate() {
        console.log("[Person.js] componentDidUpdate");
    }

    render() {
        return (
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please login!</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input
                    //ref={(inputEl) => {this.inputElementRef = this.inputEl}}
                    ref={this.inputElementRef}
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        );
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func,
}

export default withClass(Person, classes.Person);