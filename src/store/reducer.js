import * as actionTypes from './actionTypes';

const initialState = { 
    inputURLvar: '',
    articles: [],
    articleTitle: '',
    error: false ,
    loading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_ARTICLES:
        return {
            ...state,
            articles: action.articles
        };
        case actionTypes.SET_ARTICLE_TITLE:
        return {
            ...state,
            articleTitle: action.articleTitle
        };
        case actionTypes.SET_INPUT_URL:
        return {
            ...state,
            inputURLvar: action.inputURLvar
        };
        case actionTypes.FETCH_ARTICLES_START:
        return {
            loading: true
        };
        case actionTypes.FETCH_ARTICLES_SUCCESS:
        return {
            loading: false
        };
        case actionTypes.FETCH_ARTICLES_FAILED:
        return {
            error: true,
            loading: false
        };
        default: //do nothing
    }
    return state;
}

export default reducer;