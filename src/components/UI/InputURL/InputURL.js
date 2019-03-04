import React from 'react';
import TextField from '@material-ui/core/TextField';
import './InputURL.css';

const inputURL = (props) => (
    <div className="Container">
            <TextField
                error={props.isInput}
                style={{ '--category--color': props.inputColor }}
                id="outlined-error"
                label="Enter valid URL to an atom feed"
                margin="dense"
                variant="outlined"
                className="TextField"
                onChange={props.changed}
                value={props.value||''}
            />
    </div>
)



export default inputURL;
