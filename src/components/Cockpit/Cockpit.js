import React, { useEffect, useRef, useContext } from 'react';

import AuthContext from '../../context/auth-context';

import classes from './Cockpit.css';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log("[Cockpit.js] useEffect");
        toggleBtnRef.current.click();
        return () => {
            console.log("[Cockpit.js] clean up");
        }
    }, []); // it runs only for the 1st time render

    let assignedClasses = [];
    let btnClasses = '';

    if (props.showPersons) {
        btnClasses = classes.Red;
    }

    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <button ref={toggleBtnRef} className={btnClasses} onClick={props.clicked}>
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Login</button>
            <p className={assignedClasses.join(' ')} >It works !!</p>
        </div>
    );
};

export default React.memo(cockpit);