import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import './FetchButton.css';

const fetchButton = (props) => (
    <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={props.title} placement="bottom">
        <div className="ButtonDiv">
            <Button className="FetchButton" onClick={props.clicked} 
                    variant="contained" disabled={props.disabled}>
                        Fetch
            </Button>
        </div>
    </Tooltip>
);


  
export default fetchButton;