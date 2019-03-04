import * as actionTypes from './actionTypes';
import FeedMe from 'feedme';
import http from 'http';

// Note: some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy:
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

export const setInputURL = (inputURLvar) => {
    return {
        type: actionTypes.SET_INPUT_URL,
        inputURLvar: inputURLvar
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

export const fetchArticlesSuccess = (fetched,articles) => {
    return {
        type: actionTypes.FETCH_ARTICLES_SUCCESS,
        fetched: fetched,
        articles: articles,
    };
};

export const fetchArticles = (url) => {
    return dispatch => {
        dispatch(fetchArticlesStart());
        http.get(CORS_PROXY + url, (res) => {
            if (res.statusCode !== 200) {
                //console.error(new Error(`status code ${res.statusCode}`));
                dispatch(fetchArticlesFailed());
            }
            let parser = new FeedMe(true);
            res.pipe(parser);
            parser.on('end', () => {
                dispatch(fetchArticlesSuccess(true, parser.done()));
                
            });
        });
    };
};

