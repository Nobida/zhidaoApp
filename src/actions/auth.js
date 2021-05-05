//
// Authentification
// --------------------------------------------------
import bindApiKey from '../utils/bindApiKey';
import {
  getUserInfo,
  postUserInfo,
  getProbationUserInfo,
  getUserPerm ,
  getLogStatus,
  checkToken
} from '../api/auth';


export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_USER_INFO_PENDING = 'FETCH_USER_INFO_PENDING';
export const FETCH_USER_INFO_FULFILLED = 'FETCH_USER_INFO_FULFILLED';
export const FETCH_USER_INFO_REJECTED = 'FETCH_USER_INFO_REJECTED';
export const SET_PROBATION_USER_INFO = 'SET_PROBATION_USER_INFO';

export const FETCH_USER_PERM = 'FETCH_USER_PERM'
export const FETCH_USER_PERM_PENDING = 'FETCH_USER_PERM_PENDING'
export const FETCH_USER_PERM_FULFILLED = 'FETCH_USER_PERM_FULFILLED'
export const FETCH_USER_PERM_REJECTED = 'FETCH_USER_PERM_REJECTED'

export const SET_TOKEN = 'SET_TOKEN'
export const CLAIM_TOKEN  = 'CLAIM_TOKEN'
export const CLAIM_TOKEN_PENDING  = 'CLAIM_TOKEN_PENDING'
export const CLAIM_TOKEN_FULFILLED  = 'CLAIM_TOKEN_FULFILLED'
export const CLAIM_TOKEN_REJECTED = 'CLAIM_TOKEN_REJECTED'

export function setToken(token){
  return {
    type: SET_TOKEN,
    token: token
  }
}
export function claimToken(token){
  return {
    type: CLAIM_TOKEN,
    payload: bindApiKey(checkToken,token)
  }
}

export function fetchLogStatus(token){
  return {
    type: FETCH_USER_INFO,
    payload: getLogStatus(token)
  }
}

export function fetchUserInfo(){
  return {
    type: FETCH_USER_INFO,
    payload: getUserInfo()
  };
}

export function fetchUserPerm(){
  return {
    type: FETCH_USER_PERM,
    payload: bindApiKey(getUserPerm)
  }
}


export function setProbationUserInfo(){
  return {
    type: SET_PROBATION_USER_INFO,
    userInfo: getProbationUserInfo()
  }
}

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_PENDING = 'USER_REGISTER_PENDING';
export const USER_REGISTER_FULFILLED = 'USER_REGISTER_FULFILLED';
export const USER_REGISTER_REJECTED = 'USER_REGISTER_REJECTED';

export function userRegister(data){
  return {
    type: USER_REGISTER,
    payload: bindApiKey(postUserInfo, data)
  };
}
