import { collectionsReducer } from './collections';
import { regionsReducer } from './regions';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    collections: collectionsReducer,
    regions: regionsReducer
})

export default rootReducer;