import React from 'react'
import './FetchAtomFeed.css';
import InputURL from '../../components/UI/InputURL/InputURL';
import { connect } from 'react-redux';
import FetchButton from '../../components/UI/FetchButton/FetchButton';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import * as actions from '../../store/index';
import *  as color from '../../colors';

let uniqid = require('uniqid');
let moment = require('moment');


class Feed extends React.Component {


    //input change handler for <Input> element
    inputChangedHandler = (event) => {
        this.props.onSetInputURL(event.target.value);
    }

    //fetch atom feed on a button click
    handleFetch = () => { 
        this.props.onFetchArticles((this.props.inputURLvar).replace(/\s/g,''));
        this.props.onSetInputURL('');

    }

    render() {
        let button = null;
        let inputColor;
        let isInput = true;
        let articleTitle;
        let articles = null;

        if(!this.props.error) {
            //show spinner for loading
            if (this.props.loading) {
                articles = <Spinner />;
            }
            //render articles if "fetched" is true, and input url is correct
            if(this.props.fetched) {
                articleTitle = <h1 className="ArticleTitle">{this.props.articles.title}</h1>
    
                articles = this.props.articles.items.map((item, key) => (
                    <Card key={uniqid()} className="CardWrapper">
                            <div className="CardHeader">
                                <Avatar alt="Github avatar picture" src={(item['media:thumbnail'].url).replace("?s=30","?s=100")} className="Avatar" />
                                <div className="NameDateDiv">
                                    <a className="Author" href={item.author.uri} target="_blank" rel="noopener noreferrer">
                                        {item.author.name}
                                    </a>
                                    <p className="Date">{moment(item.published, 'YYYY-MM-DDThh:mm:ssZ').format('YYYY-MM-DD')}</p>
                                </div>
                            </div> 
                            <Button target="_blank" rel="noopener noreferrer" href={item.link.href} className="TitleLink">{item.title}</Button>
                           
                    </Card>
                ))
    
            } 

        }
        else {
            //render error message if there is an error with input url
            articles = <Snackbar    open={true}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">Wrong input, here is an example: github.com/zilinsky.atom</span>}
                        />
        }
        


        //enable "fetch" button if there is an output
        if (this.props.inputURLvar) {
            button = <FetchButton title={"Fetch Feed"} disabled={false} clicked={this.handleFetch} />
            inputColor = color.BLUE;
            isInput = false;
        }
        //disable "fetch" button, because of no output
        else {
            button = <FetchButton  title={"Button Disabled"} disabled={true} />
            inputColor = color.RED;
        }


        return (
            <div>
                <Backdrop show={this.props.loading} />
                <div className="Header">
                    <InputURL changed={(event) => this.inputChangedHandler(event)}
                        value={this.props.inputURLvar}
                        inputColor={inputColor} isInput={isInput} />
                    {button}
                </div>
                <div className="body">
                </div>
                {articleTitle}
                {articles}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inputURLvar: state.inputURLvar,
        articles: state.articles,
        loading: state.loading,
        fetched: state.fetched,
        error: state.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchArticles: (url) => dispatch(actions.fetchArticles(url)),
        onSetInputURL: (input) => dispatch(actions.setInputURL(input))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);