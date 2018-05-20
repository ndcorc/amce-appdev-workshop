import * as types from './actionTypes';
import _ from 'lodash';
import axios from 'axios';
import { config } from '../config';

export const fetchLoans = () => {
  return dispatch => {
    return axios.get(config.BASE_URL+'/loans', config.HEADERS)
      .then(res => {
        var loans = _.sortBy(res.data, ['status', 'loanee'])
        dispatch(getLoans(loans))
      });
  };
}

export const getLoans = (loans) => {
  return {type: types.GET_LOANS, loans: loans};
}

export const fetchToken = () => {
  return dispatch => {
    return axios.get(config.BASE_URL+'/dealers', config.HEADERS)
      .then(res => {
        dispatch(getToken(res.data.token));
      })
  }
}

export const getToken = (token) => {
  return {type: types.GET_TOKEN, token: token};
}

export const updateLoan = (index, loan) => {
  return {type: types.UPDATE_LOAN, index: index, loan: loan};
}

export const updateLoans = (loans) => {
  return {type: types.SORT_LOANS, loans: loans}
}

export const updateUnread = (unreadMsg) => {
  return dispatch => {
    dispatch({type: types.UPDATE_UNREAD, unreadMsg: unreadMsg});
  }
}

export const sortLoans = (param=null) => {
  return {type: types.SORT_LOANS, param: param}
}