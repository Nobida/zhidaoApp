import {
  FETCH_SIGNATURE_PENDING,
  FETCH_SIGNATURE_FULFILLED,
  SET_SHARE_PAGE,
} from '../actions/wechat';
import { configWechat, updateSharePage, isWeixinBrowser } from '../utils/wechat';

const initialState = {
  fetching_signature: false,
  didConfig: false,
  sharePage: "none",
};
export default function wechat(state = initialState, action = {}) {
  switch (action.type){

    case FETCH_SIGNATURE_PENDING:
      console.log('fetching signature');
      return Object.assign({}, state, { fetching_signature: true });

    case FETCH_SIGNATURE_FULFILLED:
      console.log('fetch signature success');
      console.log(action);
      const SDKConfig = action.payload;
      if (isWeixinBrowser()) {
        configWechat(SDKConfig);
      }
      return Object.assign({}, state, {
        fetching_signature: false,
        didConfig: true,
      });

    case SET_SHARE_PAGE:
      console.log('set share page');
      console.log(action);
      const shareConfig = action.payload.config;
      if (isWeixinBrowser()) {
        updateSharePage(shareConfig);
      }
      return Object.assign({}, state, {
        sharePage: action.payload.sharePage,
      });

    default:
      return state;
  }
}