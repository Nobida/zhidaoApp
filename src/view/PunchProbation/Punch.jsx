import React from 'react';
import Button from '../../common_component/Button';
import Avatar from '../../common_component/Avatar';
import check from '../../img/check_w.svg';
import close from '../../img/close_w.svg';
import punchInfo from '../../img/punch-info.svg';
import './style.scss';

export default class Punch extends React.Component {
  constructor(props){
    super(props);
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
        console.log(item);
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
    history.replace("/reading-probation-finished/"+lesson_id+"/Notes");
  }

  componentDidMount() {
    console.log('Punch did mount');
    const { actions, lesson_info } = this.props;
    const lesson_id = this.props.match.params.lesson_id;
    if (lesson_id) {
      actions.fetchQuizset(lesson_id);
      actions.fetchLesson(lesson_id);
    }
  }

  render(){
    console.log('Punch render');
    const { headimgurl, lesson_info } =  this.props;
    let quizAnswerItems = this.getQuizAnswerItems();
    let quizSolves = this.getQuizSolves();
    return(
      <div className="punch">
        <div className="punch-container">
          <Avatar size="lg" src={headimgurl} />
          <div className="punch-inner-container">
            <div className="punch-content">
              <div className="punch-title">今日任务已完成</div>
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
