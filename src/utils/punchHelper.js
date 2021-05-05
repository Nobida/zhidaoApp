import store from '../store';
import { SHARE_URL, ROOT_URL, SHARE_URL_TEST, DIPLOMA_URL, READING_PROBATION_URL } from '../api/const';
import { getRandomStr } from './wechat';
import { getCourseBooks } from './lesson_helper';

/*
* 进阶三班：102
* 基础二班：101
* 进阶二班：101
* 进阶一班：100
* 基础一班：101
* */
//获取学号
function getStudentID(id){
    let idStr = 'ZD';
    let idNumlen = 7;
    let idDigit = Math.ceil(Math.log(id) / Math.LN10);
    for(let i=0;i<idNumlen-idDigit;i++){
      idStr+='0'
    }
    idStr+=id;
    return idStr;
}
//获取当前日期字符串
function getCurDateStr(){
    const date = new Date();
    const Y = date.getFullYear() + '/';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    const D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());
    return Y+M+D;
}

export function setProbationSharePage(setSharePageFunc, createSharePageFunc){
  const config = genProbationConfig()
  console.log('config')
  console.log(config) 
  setSharePageFunc({
    sharePage: 'punch',
    config: config.config
  })
  createSharePageFunc(config)

}

//设置打卡页面 
export function setPunchPage(setSharePageFunc, createSharePageFunc) {
  const data = genDataToPost();
  if(data.template=='lesson'){
    const info = data.data;
    const {nickname,course_name,name,day_num,picture,ad_url,desc} = info;
    setSharePageFunc({
      sharePage: "punch",
      config: {
        title:  (course_name ? course_name : '') +'阅读'+ (day_num||1) +'天：'+name +' | '+ desc  ,
        link: SHARE_URL_TEST + '?nickname='+encodeURIComponent(nickname) +
          '&course_name='+encodeURIComponent(course_name)+
          '&lesson_name='+encodeURIComponent(name)+
          '&picture='+encodeURIComponent(picture)+
          '&desc='+encodeURIComponent(desc)+
          '&ad_url='+encodeURIComponent(ad_url)+
          '&day_num='+day_num,
        imgUrl: picture? ROOT_URL+encodeURIComponent(picture)+"?thumbnail=True" :ROOT_URL + 'static/logo/logo-square.png',
        desc: desc
      }
    });
  }else{
    // setSharePageFunc({
    //   sharePage: "punch",
    //   config: {
    //     title: data.title,
    //     link: SHARE_URL + data.uuid,
    //     imgUrl: ROOT_URL + 'static/logo/logo-square.png',
    //     desc: data.data.desc
    //   }
    // });
    /*
    * 毕业打卡
    * */
    const info = data.data;
    const {nickname,course_name,id,date,desc} = info;
    setSharePageFunc({
      sharePage: "punch",
      config: {
        title:  data.title ,
        link: DIPLOMA_URL + '?nickname='+encodeURIComponent(nickname) +
          '&course_name='+encodeURIComponent(course_name)+
          '&id='+encodeURIComponent(id)+
          '&date='+encodeURIComponent(date),
        imgUrl: ROOT_URL + 'pic/logo/logo_square.jpg',
        desc: desc
      }
    });

  }

  createSharePageFunc(data);
}

function genProbationConfig(){
  let state = store.getState();
  const nickname = state.auth && state.auth.user_info ?state.auth.user_info.nickname:'知道君';
  const invitation_code = state.auth && state.auth.user_info ?state.auth.user_info.invitation_code:'0000';
  const id = state.auth && state.auth.user_info.id ?state.auth.user_info.id:1;
  const lesson_info = state.cur_lesson.lesson_info.lesson_info;
  const picture = lesson_info && lesson_info.picture ? lesson_info.picture: 'pic/banner/chinese/黛山雨后.jpg';
  const cur_course = state.cur_course.course;
 
  const course_name = cur_course.name;
  return {
    uuid: getRandomStr(32),
    template: 'lesson', 
    title: nickname+'邀请你试读'+course_name+':《'+lesson_info.name+"》|"+lesson_info.desc,
    config:{ 
      title: nickname+'邀请你试读'+course_name+':《'+lesson_info.name+"》|"+lesson_info.desc,
      link: READING_PROBATION_URL + lesson_info.course +'/'+lesson_info.id+'/HEAD?invation_code='+invitation_code,
      imgUrl: picture? ROOT_URL+encodeURIComponent(picture)+"?thumbnail=True" :ROOT_URL + 'static/logo/logo-square.png',
      desc: lesson_info.desc
    }
  }
} 

function genDataToPost() {
  let state = store.getState();
  const nickname = state.auth && state.auth.user_info ?state.auth.user_info.nickname:'知道君';
  const id = state.auth && state.auth.user_info.id ?state.auth.user_info.id:1;

  const lesson_info = state.cur_lesson.lesson_info.lesson_info;
  const picture = lesson_info && lesson_info.picture ? lesson_info.picture: 'pic/banner/chinese/黛山雨后.jpg';
  const cur_course = state.cur_course.course;
  const ad_url = cur_course.ad_url?cur_course.ad_url:'';
  const books = state.books;
  const course_name = cur_course.name;
  const day_num = getDayNum(state);

  console.log('day_num:'+day_num);

  let title, desc, template, info;
  if (isGraduate(state)) {
    title = '我从知道人文' + (course_name ? course_name : '') + '毕业啦!';
    const courseBooks = getCourseBooks(cur_course, books);
    const bookArray = courseBooks.map(book => book.title);

    desc = cur_course.begdt + ' ~ ' + cur_course.enddt + "：" + bookArray.join("，") + "。";
    template = 'graduate2';
    info = {
      course_id: lesson_info.course,
      course_name,
      nickname,
      date: getCurDateStr(),
      id: getStudentID(id),
      desc,
      day_num,
      course_books: bookArray,
    };
  } else {

    title = '已在知道人文' + (course_name ? course_name : '') + '阅读' + (day_num||1) + '天，今天读的是《' + lesson_info.name + '》。';
    desc = lesson_info.desc;
    template = 'lesson';
    info = {
      course_id: lesson_info.course,
      course_name: course_name ? course_name : '',
      date: lesson_info.date,
      id: lesson_info.id,
      name: lesson_info.name,
      desc,
      books: lesson_info.books,
      day_num,
      nickname,
      picture,
      ad_url
    };
  }
  return {
    uuid: getRandomStr(32),
    title: title,
    template,
    data: info,
  };
}

function getDayNum(state) {
  const lesson_info = state.cur_lesson.lesson_info.lesson_info;
  const user_stat = state.user_stat.stat;
  let participated_day_num = 0;
  if (user_stat.course_day_num && lesson_info.course) {
    participated_day_num = user_stat.course_day_num[lesson_info.course]?user_stat.course_day_num[lesson_info.course]:lesson_info.day_num;
  }
  return participated_day_num;
}

function isGraduate(state) {
  const total_day_num = state.cur_course.course.total_day_num;
  const user_info = state.auth.user_info
  const day_num = getDayNum(state);
  return day_num === total_day_num
         // || user_info.nickname === '杨东伟'
         // || user_info.nickname === '王小贱'
         // || user_info.nickname === 'Ricky'
         // || user_info.nickname === '寻江'
         // || user_info.nickname === 'Tom Sun';
}