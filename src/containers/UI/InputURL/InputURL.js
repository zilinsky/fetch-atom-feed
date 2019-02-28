import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../../store/index';
import './InputURL.css';

class InputURL extends Component {


    handleTextChange(event) {
        this.props.onSetInputURL(event.target.value);
    }

    render() {

        const theme = createMuiTheme({
            palette: {
                primary: {
                    main: this.props.inputColor,
                },
                typography: { useNextVariants: true },
            },
        })

        return (
            <div className="container">
                <MuiThemeProvider theme={theme}>
                    <TextField
                        error={this.props.isError}
                        style={{ '--category--color': this.props.inputColor }}
                        id="outlined-error"
                        label="Enter valid URL to an atom feed"
                        margin="dense"
                        variant="outlined"
                        className="textField"
                        value={this.props.inputURLvar}
                        onChange={event => this.handleTextChange(event)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inputURLvar: state.inputURLvar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetInputURL: (input) => dispatch(actions.setInputURL(input))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(InputURL);
