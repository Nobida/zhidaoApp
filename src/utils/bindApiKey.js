/*
为action绑定apikey信息，apikey会作为最后一个字段绑定
* */
import store from '../store';
export default function bindApiKey(func,args){
  let state = store.getState();
  let userInfo = state.auth.user_info;
  let apiKey = userInfo.apikey;
  if(apiKey){
    if(args) {
      if(args instanceof Array)
        args = [...args,apiKey];
      else{
        args = [args,apiKey];
      }
    }
    else{
      args = [apiKey];
    }
    return func(...args);
  }else{
    //TODO 应该返回一个有错误信息的promise
  }
}