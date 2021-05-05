import React from 'react';
import Button from '../../common_component/Button';
import Avatar from '../../common_component/Avatar';
import check from '../../img/check_w.svg';
import close from '../../img/close_w.svg';
import punchInfo from '../../img/punch-info.svg';
import punchInfoSuccess from '../../img/punch-info-success.svg';
import { getRandomStr } from '../../utils/wechat';
import { SHARE_URL, ROOT_URL } from '../../api/const';
import { getCourseBooks } from "../../utils/lesson_helper";
import {trackReadShareEvent,trackViewPunchEvent} from "../../utils/cnzz_helper";
import './style.scss';

export default class Punch extends React.Component {
  constructor(props){
    super(props);
  }

  getDayNum() {
    const { lesson_info, cur_course, user_stat } = this.props;
    let participated_day_num = 0;
    if (user_stat.course_day_num && lesson_info.course) {
      participated_day_num = user_stat.course_day_num[lesson_info.course];
    }
    return participated_day_num;
  }

  isGraduate() {
    const { cur_course, user_info } = this.props;
    const { total_day_num } = cur_course;
    const day_num = this.getDayNum();
    return day_num === total_day_num
          // || user_info.nickname === '杨东伟'
          // || user_info.nickname === '王小贱'
          // || user_info.nickname === 'Ricky'
          // || user_info.nickname === 'Tom Sun';
  }

  genDataToPost() {
    const { lesson_info, cur_course, books } = this.props;
    const course_name = cur_course.name;
    const day_num = this.getDayNum();

    let title, desc, template, info;
    if (this.isGraduate()) {
      title = '我从知道人文' + (course_name?course_name:'') + '毕业啦!';
      const courseBooks = getCourseBooks(cur_course, books);
      const bookArray = courseBooks.map(book => book.title);
      desc = cur_course.begdt + ' ~ ' + cur_course.enddt + "：" + bookArray.join("，") + "。";
      template = 'graduate2';
      info = {
        course_id: lesson_info.course,
        course_name,
        desc,
        day_num,
        course_books: bookArray,
      };
    } else {
      title = '已在知道人文' + (course_name?course_name:'') + '阅读' + day_num + '天，今天读的是《' + lesson_info.name +'》。';
      desc = lesson_info.desc;
      template = 'lesson';
      info = {
        course_id: lesson_info.course,
        course_name,
        date: lesson_info.date,
        id: lesson_info.id,
        name: lesson_info.name,
        desc,
        books: lesson_info.books,
        day_num,
      };
    }
    return {
      uuid: getRandomStr(32),
      title: title,
      template,
      data: info,
    };
  }

  getQuizAnswerItems() {
    const { quizes } =  this.props;
    let quizAnswerItems = [];
    if (quizes instanceof Array) {
      quizAnswerItems = quizes.map(item=>
        <div className="answer-item" key={item.id}>
          <div className="num">
            {item.order}
          </div>
          <div className="result">
            <img src={item.correct?check:close}/>
          </div>
        </div>
      );
    }

    return quizAnswerItems;
  }

  componentWillReceiveProps(nextProps){
    const quizes= this.props.quizes;
    const nextQuizes = nextProps.quizes;
    if(!quizes || !quizes.length) {
      if (nextQuizes instanceof Array && nextQuizes.length) {
        trackViewPunchEvent(nextQuizes);
      }
    }
  }
  getQuizSolves() {
    const { quizes } =  this.props;
    let quizSolves = [];
    if (quizes instanceof Array) {
      quizSolves = quizes.map(function(item){
        const questionLineItem = item.question_lines.map((d,i)=>
          <p key={i}>{d}</p>
        );
        let choicesItems = [];
        if (item.choices){
          for(let key in item.choices){
            choicesItems.push(<div className={key == item.right_answer?'choice-item active':'choice-item'}>
              {key}: {item.choices[key]}
            </div>);
          }
        }
        return (
          <div className="solve-item" key={item.id}>
            <div className="num">
              {item.order}
            </div>
            <div className="quiz-title">
              {questionLineItem}
            </div>
            <div className="choices">
              {choicesItems}
            </div>
            <div className="solve-content">
              {item.comments}
            </div>
          </div>
        );
      });
    }
    return quizSolves;
  }

  redirect() {
    const lesson_id = this.props.match.params.lesson_id;
    const { history } = this.props;
    history.replace("/reading/"+lesson_id+"/Notes");
  }

  componentDidMount() {
    console.log('Punch did mount');
    const { actions, lesson_info, books, user_stat } = this.props;
    const lesson_id = this.props.match.params.lesson_id;
    if (lesson_id) {
      actions.fetchQuizset(lesson_id);
      actions.fetchLesson(lesson_id);
      if (!books.books.length) {
        actions.fetchBooks();
      }
      if (!user_stat.course_day_num) {
        actions.fetchUserStat();
      }
    }
  }

  componentDidUpdate() {
    console.log('Punch did update');
    const { actions, answered, quizes, lesson_info, cur_course } = this.props;
    if (!cur_course.uuid && lesson_info.course) {
      actions.fetchCourseByID(lesson_info.course)
    }
    if (quizes.length === 0 || answered) {
      const data = this.genDataToPost();
      actions.setSharePage({
        sharePage: "punch",
        config: {
          title: data.title,
          link: SHARE_URL + data.uuid,
          imgUrl: ROOT_URL + 'static/logo/logo-square.png',
          desc: data.data.desc,
          success: function () {
            // actions.createSharePage(data);  // 回调已被微信废弃
            trackReadShareEvent();
          },
          cancel: function () {
          }
        },
      });
      actions.createSharePage(data);
    } else {
      actions.setDefaultSharePage();
    }
  }

  render(){
    console.log('Punch render');
    const { user_info, lesson_info } =  this.props;
    let quizAnswerItems = this.getQuizAnswerItems();
    let quizSolves = this.getQuizSolves();
    let punchTitle = '今日任务已完成';
    let punchTipImg = punchInfo;
    if (this.isGraduate()) {
      punchTitle = '恭喜你已完成本学期的课程';
      punchTipImg = punchInfoSuccess;
    }
    return(
      <div className="punch">
        <div className="punch-info">
          <img src={punchTipImg}/>
        </div>
        <div className="punch-container">
          <Avatar size="lg" src={user_info.headimgurl} />
          <div className="punch-inner-container">
            <div className="punch-content">
              <div className="punch-title">{ punchTitle }</div>
              <div className="day">
                DAY{lesson_info.day_num}
              </div>
              <div className="quiz-answers">
                {quizAnswerItems}
              </div>
              <div className="solve-title">
                今日解析
              </div>
              <div className="solves">
                {quizSolves}
              </div>
              <br/>
              <div onClick={this.redirect.bind(this)}>
                <Button type="inverse">查看讲义</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
