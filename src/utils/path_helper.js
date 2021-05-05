//检查是否为试读路由
export function checkProbationPath(location){
  if(location.pathname != '/'){
      const parent_path = location.pathname.split('/')[1];
      const path_split = parent_path.split('-');
      //如果是试读路由
      if(path_split[0]=='probation' ||path_split.length>1 && path_split[1]=='probation' || parent_path=='course-info' || parent_path=='book-info' || parent_path=='note' || parent_path=='question' ){
        return true;
      }
  }
  return false;
}

//检查是否要设置返回主页按钮
export function checkShouldSetBackBtn(location){
  if(location.pathname != '/'){
      const parent_path = location.pathname.split('/')[1];
      if(parent_path=='main' || parent_path=='reading' || parent_path=='reading2' ||
          checkProbationPath(location) ||
        parent_path=='user-guide' || parent_path=='gift' ||
          parent_path=='ad-page' || parent_path=='created-orders'
      ){
          return false;
      }else{
        return true;
      }

  }
  return false;

}

export function checkShouldPtuBackBtnToTop(location){
  if(location.pathname != '/'){
      const parent_path = location.pathname.split('/')[1];
      if(parent_path=='store-item-detail'||parent_path=='course-intro'){
          return true;
      }
  }
  return false;

}

export function getUrlParam(name){
   var url = window.location.href.toString().split('?'); //获取url中"?"符后的字串
   if(url.length>1) {
      url = url[url.length-1]
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = url.match(reg);
      if (r != null) return unescape(r[2]); return null;
   }else{
     return null;
   }
}

export function getParamStr(sign){
  var str = window.location.href.toString().split('?');
  if(str.length>1){
    return (sign?sign:'') + str[str.length-1]
  }else{
    return ''
  }
}