export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function getQueryString2(name) {
  var href = window.location.href || window.location.search;
  var match = href.match(new RegExp('[?&]' + name + '=([^&]*)'));
  return match && match[1] && decodeURIComponent(match[1]) || '';
}

// 上面三个函数暂时没有用到

export function getQueryString(name) {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  return (r != null) ? unescape(r[2]) : null;
}

Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S"  : this.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear()+"").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("("+ k +")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)
      );
    }
  }
  return format;
}

export function getLocalTime(worldTime, timeZone) {
  const time = (new Date(worldTime.split('-').join('/'))).getTime();
  const localTime = new Date(time+timeZone*3600000);
  return localTime.format("yy/MM/dd hh:mm");
}

export function getItemIndexInList(itemID, items) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].uuid == itemID) {
      return i;
    }
  }
  return -1;
}
