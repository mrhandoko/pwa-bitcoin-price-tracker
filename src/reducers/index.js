import { combineReducers } from 'redux';
import bitcoinRateReducer from './bitcoinRateReducer';

const reducers = {
  bitcoinRateStore: bitcoinRateReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
