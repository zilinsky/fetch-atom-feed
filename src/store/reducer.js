import * as actionTypes from './actionTypes';

const initialState = { 
    inputURLvar: '',
    articles: [],
    error: false ,
    loading: false,
    fetched: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
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
            ...state,
            articles: action.articles,
            fetched: true,
            loading: false,
            error: false
        };
        case actionTypes.FETCH_ARTICLES_FAILED:
        return {
            error: true,
            loading: false
        };
        default: return state;
    }
}

export default reducer;