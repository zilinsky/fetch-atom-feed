import React, { Component } from 'react'
import './FetchAtomFeed.css';
import InputURL from '../UI/InputURL/InputURL';
import { connect } from 'react-redux';
import FetchButton from '../../components/UI/FetchButton/FetchButton';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/index';



//https://github.com/zilinsky.atom
// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

let test = "MI EZ";

class Feed extends React.Component{

    state = {
        ingredients: null

    }

    componentDidMount () {
        this.props.onFetchArticles();
    }

    render() {
        console.log("render method");
        let  button = null;
        let inputColor = '#9E9E9E';
        let isError = true;
        let articles;

        if ( this.props.loading ) {
            articles = <Spinner />;
        }

        //enable "fetch" button if there is an output
        if (this.props.inputURLvar) {
            button = <FetchButton title={"Fetch Feed"} disabled={false} clicked={this.handleFetch}/>
            inputColor = '#2E7D32';
            isError = false;
        }
        //disable "fetch" button, because of no output
        else {
            button = <FetchButton title={"Button Disabled"} disabled={true}/>
            inputColor = '#D50000';
        }


        return (
            <div>
                <Backdrop show={this.props.loading} />
                <div className="header">
                    <InputURL inputColor={inputColor} isError={isError}/>
                    {button}
                </div>
                <div className="body">
                </div>
                {articles}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inputURLvar: state.inputURLvar,
        articles: state.articles,
        loading: state.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetArticles: (articles) => dispatch(actions.setArticles(articles)),
        onFetchArticles: () => dispatch(actions.fetchArticles())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Feed);