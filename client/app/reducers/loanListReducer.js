import initialState from './initialState';
import {
  FETCH_LOANS, GET_LOANS, FETCH_DEALER, GET_DEALER,
  UPDATE_LOAN, SORT_LOANS, UPDATE_UNREAD, 
  NEW_NOTIFICATION, CLEAR_NOTIFICATIONS,
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
        success: false
      }

    case FETCH_DEALER:
      console.log('FETCH_DEALER Action')
      return action;
      
    case GET_DEALER:
      console.log('RECEIVE_DEALER Action')
      console.log(state);
      return {
        ...state,
        token: action.token,
        notifications: action.notifications
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

    case NEW_NOTIFICATION:
      newState = state;
      newState.notifications.push(action.notification);
      return {
        ...state,
        notifications: newState.notifications
      }

    case CLEAR_NOTIFICATIONS:
      newState = state;
      newState.notifications = [];
      return {
        ...state,
        notifications: newState.notifications
      }

    default:
      return state;
  }
}