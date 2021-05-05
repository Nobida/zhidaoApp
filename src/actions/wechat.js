import bindApiKey from '../utils/bindApiKey';
import { getSignature } from '../api/wechat';
import { INTRO_URL, ROOT_URL } from '../api/const';
import store from '../store';

export const FETCH_SIGNATURE = 'FETCH_SIGNATURE';
export const FETCH_SIGNATURE_PENDING = 'FETCH_SIGNATURE_PENDING';
export const FETCH_SIGNATURE_FULFILLED = 'FETCH_SIGNATURE_FULFILLED';
export const FETCH_SIGNATURE_REJECTED = 'FETCH_SIGNATURE_REJECTED';

export function fetchSignature(curURL) {
  return {
    type: FETCH_SIGNATURE,
    payload: bindApiKey(getSignature, curURL),
  }
}

export const SET_SHARE_PAGE = 'SET_SHARE_PAGE';
export function setSharePage(payload) {
  return {
    type: SET_SHARE_PAGE,
    payload,
  } 
} 
export function setAdSharePage(){
  const state = store.getState();
  let title = '一起走一条向上的路';
  let shareUrl = INTRO_URL;
  let course_pic =  ROOT_URL + 'static/logo/logo-square.png';
  if (state.auth.user_info && state.cur_course.course && state.cur_course.course.uuid) {
    let nickname = state.auth.user_info.nickname;
    const course_name = state.cur_course.course.name;
    const course_desc = state.cur_course.course.desc;
    const course_ad_url = state.cur_course.course.ad_url;
    course_pic = state.cur_course.course.picture?  ROOT_URL+encodeURIComponent(state.cur_course.course.picture)+"?thumbnail=True":course_pic;
    if (nickname == '试读用户') {
      nickname = ''
    }
    const invitation_code = state.auth.user_info.invitation_code;
    title = nickname + '邀请你加入'+course_name+ (course_desc?'——'+course_desc:'');
    shareUrl = course_ad_url + '?source=invitation_link&invitation_code='+invitation_code;
  }
  return {
    type: SET_SHARE_PAGE,
    payload: {
      sharePage: "default",
      config: {
        title,
        link: shareUrl,
        imgUrl: course_pic,
      },
    },
  }
}
export function setDefaultSharePage() {
  const state = store.getState();
  let title = '一起走一条向上的路';
  let shareUrl = INTRO_URL;
  if (state.auth.user_info) {
    let nickname = state.auth.user_info.nickname;
    if (nickname == '试读用户') {
      nickname = ''
    }
    const invitation_code = state.auth.user_info.invitation_code;
    title = nickname + '邀请你加入知道人文——一起走一条向上的路';
    shareUrl+='?invitation_code='+invitation_code+'&source=invitation_link';
  }
  return {
    type: SET_SHARE_PAGE,
    payload: {
      sharePage: "default",
      config: {
        title,
        link: shareUrl,
        imgUrl: ROOT_URL + 'static/logo/logo-square.png',
      },
    },
  }
}