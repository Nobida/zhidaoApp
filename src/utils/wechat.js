export function getRandomStr(len) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let listStr = [];
  for (let i = 0; i < len; i++) {
    listStr[i] = chars[0 | Math.random()*chars.length];
  }
  return listStr.join('');
}

export function configWechat(configInfo) {
  const conf = {
    debug: false,
    appId: configInfo.appid,
    timestamp: configInfo.timestamp,
    nonceStr: configInfo.noncestr,
    signature: configInfo.signature,
    jsApiList: [
      "onMenuShareAppMessage",
      "onMenuShareTimeline",
      "onMenuShareQQ",
      "onMenuShareWeibo",
      "onMenuShareQZone"
    ]
  };
  console.log('configWechat');
  console.log(conf);
  wx.config(conf);
}

export function updateSharePage(config) {
  wx.ready(function(){
    console.log('updateSharePage');
    console.log(config);
    wx.onMenuShareAppMessage(config);
    wx.onMenuShareTimeline(config);
    wx.onMenuShareQQ(config);
    wx.onMenuShareWeibo(config);
    wx.onMenuShareQZone(config);
  });
}

export function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase();
  if (agent.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
