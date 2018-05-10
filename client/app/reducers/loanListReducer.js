import initialState from './initialState';
import {
  FETCH_LOANS, GET_LOANS, NEW_MESSAGE,
  UPDATE_LOAN, SORT_LOANS, UPDATE_UNREAD
} from '../actions/actionTypes';
import _ from 'lodash';

export default function loanList(state = initialState.loanList, action) {
  let newState;
  switch (action.type) {
    case FETCH_LOANS:
      console.log('FETCH_LOANS Action')
      return action;
      
    case GET_LOANS:
      console.log('RECEIVE_LOANS Action')
      console.log(state);
      return {
        ...state,
        loans: action.loans,
        column: "status",
        direction: "ascending",
        unreadMsg: {
          unread: false,
          profile: 1
        },
        success: false
      }

    case UPDATE_LOAN:
      newState = state;
      console.log(newState.loans[action.index]);
      newState.loans[action.index] = action.loan;
      return {
        ...state,
        loans: newState.loans
      }

    case SORT_LOANS:
      newState = state;
      if (action.param === null) {
        newState.column = state.column;
        newState.loans = state.loans.reverse();
        newState.direction = state.direction === 'ascending' ? 'descending' : 'ascending';
      } else {
        newState.column = action.param;
        newState.loans = _.sortBy(state.loans, [action.param]),
        newState.direction = 'ascending'
      }
      return {
        ...state,
        column: newState.column,
        direction: newState.direction,
        loans: newState.loans
      };

    case UPDATE_UNREAD:
      return {
        ...state,
        unreadMsg: action.unreadMsg
      }

    default:
      return state;
  }
}