import store from '../store';

export function trackPageView(content_url,refer_url){
  console.log('track page view');
  console.log(content_url);
  // if(content_url && !refer_url)
  //   _czc.push(["_trackPageview",content_url]);
  // if(content_url && refer_url)
  //   _czc.push(["_trackPageview",content_url, refer_url]);

}
export function closeAutoPageview(){
  // _czc.push(["_setAutoPageview", false]);
}
export function trackEvent(category,action,label,value,nodeid){

  // _czc.push(["_trackEvent",category,action,label,value,nodeid]);

}
export function setCustomVar(name,value){
  // _czc.push(["_setCustomVar",name,value,1]);
}

export function setCustom(){
  // let state = store.getState();
  // let userInfo = state.auth.user_info;
  // _czc.push(["_setCustomVar",'会员ID',userInfo.id +'_'+userInfo.nickname,1]);
}
export function trackLogEvent(){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  if(!userInfo){
    return;
  }
  console.log('trackevent-用户-登陆-'+userInfo.id);
  _czc.push(["_trackEvent",'用户','登陆','',userInfo.id]);

}
export function trackRegiserEvent(){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  if(!userInfo){
    return;
  }

  // _czc.push(["_trackEvent",'用户','注册','',userInfo.id]);
}
export function trackViewEvent(interval){

  // _czc.push(["_trackEvent",'访问','访问时长','总页面',interval]);
}
export function trackPunchEvent(){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  let lesson_info = state.cur_lesson.lesson_info.lesson_info;
  if(!lesson_info){
    return;
  }
  //_czc.push(["_trackEvent",'每日课程','打卡',lesson_info.course+'_'+lesson_info.day_num +'_'+lesson_info.id,userInfo.id]);

}
export function trackViewPunchEvent(quizes){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  let lesson_info = state.cur_lesson.lesson_info.lesson_info;
  let correct_rate = 0;
  if(!quizes || !quizes.length){
    return;
  }
  quizes.map(function(d,i){
    if(d.correct)
      correct_rate += 1.0;
  });
  correct_rate = correct_rate/quizes.length;
  console.log('trackevent-查看打卡-'+correct_rate);
  //_czc.push(["_trackEvent",'每日课程','查看打卡',lesson_info.course+'_'+lesson_info.day_num +'_'+lesson_info.id,correct_rate]);

}
export function trackReadShareEvent(){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  let lesson_info = state.cur_lesson.lesson_info.lesson_info;
  if(!lesson_info || !userInfo){
    return;
  }
  //_czc.push(["_trackEvent",'每日课程','分享',lesson_info.course+'_'+lesson_info.day_num +'_'+lesson_info.id]);

}
export function trackReadEvent(interval){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  let lesson_info = state.cur_lesson.lesson_info.lesson_info;
  if(!lesson_info || !userInfo){
    return;
  }
  //_czc.push(["_trackEvent",'每日课程','阅读',lesson_info.course+'_'+lesson_info.day_num +'_'+lesson_info.id,interval,userInfo.id]);
}


