import {combineReducers} from 'redux';
import loanList from './loanListReducer';

const rootReducer = combineReducers({
  loanList
});

export default rootReducer;