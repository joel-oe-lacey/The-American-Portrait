import { collectionsReducer } from './collections';
import { regionReducer } from './region';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    collections: collectionsReducer,
    region: regionReducer
})

export default rootReducer;