import * as actionTypes from './actionTypes';
import axios from 'axios';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const setInputURL = (inputURLvar) => {
    return {
        type: actionTypes.SET_INPUT_URL,
        inputURLvar: inputURLvar
    };
};

export const setArticles = (articles) => {
    return {
        type: actionTypes.SET_ARTICLES,
        articles: articles
    };
};

export const setArticleTitle = (articleTitle) => {
    return {
        type: actionTypes.SET_ARTICLE_TITLE,
        articleTitle: articleTitle
    };
};

export const fetchArticlesStart = () => {
    return {
        type: actionTypes.FETCH_ARTICLES_START
    };
};

export const fetchArticlesFailed = () => {
    return {
        type: actionTypes.FETCH_ARTICLES_FAILED
    };
};

export const fetchArticlesSuccess = () => {
    return {
        type: actionTypes.FETCH_ARTICLES_SUCCESS
    };
};

export const fetchArticles = () => {
    return dispatch => {
        dispatch( fetchArticlesStart() );
        axios.get( CORS_PROXY+ 'https://github.com/zilinsky.atom' )
            .then( response => {

                //explicitArray (default: true): Always put child nodes in an array if true; otherwise an array is created only if there is more than one.
                let parseString = require('xml2js');
                let xml = response.data;
                //options for xml2js can put below:
                var parser = parseString.Parser({ explicitArray: false });
                parser.parseString(xml, function (err, result) {
                    console.dir(result);
                    dispatch(setArticleTitle(result.feed.title));
                    dispatch(setArticles(result));
                });
                dispatch( fetchArticlesSuccess() );
                console.log("fetched");
               //dispatch(setArticles(response.data));
            } )
            .catch( error => {
                dispatch(fetchArticlesFailed());
            } );
    };
};

