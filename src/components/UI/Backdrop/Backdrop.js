import React from 'react';
import './Backdrop.css';

//Backdrop when this.props.loading is true
const backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.clicked}></div> : null
);

export default backdrop;