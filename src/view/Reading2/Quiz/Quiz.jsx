import React from 'react';
import Button from '../../../common_component/Button';
import Toast from '../../../common_component/Toast';
import { SwitchLayoutItem, SwitchLayoutContainer } from '../../../common_component/SwitchLayout';
import {trackPunchEvent} from "../../../utils/cnzz_helper";
import {check,close} from "../../../svg/index";
import './style.scss';

class QuizAnswerItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem
        className="quiz-answer"
        active={this.props.active}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </SwitchLayoutItem>
    );
  }
}

class QuizAnswers extends  React.Component {
  render() {
    return (
      <SwitchLayoutContainer
        className="quiz-answers"
        defaultActiveItem={-1}
        handleIndexChange={this.props.handleIndexChange}>
        {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}

class QuizAnswerItemAnswered extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const className = "quiz-answer-answerd" + ((this.props.isRightAnswer)?' right-answer':(this.props.isUserAnswer)?' user-answer':'');
    return (
      <div className={className}>
        {this.props.children}
        {this.props.isRightAnswer?(<div className='right-icon'>{check}</div>):this.props.isUserAnswer?(<div className='wrong-icon'>{close}</div>):null}
      </div>
     );
  }
}

class QuizItem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleAnswerIndexChange(quizId, index) {
    const { choices } = this.props;
    let choiceList = [];
    for (let key in choices) {
      choiceList.push(key);
    }
    if (this.props.handleAnswerIndexChange) {
      this.props.handleAnswerIndexChange(quizId,choiceList[index]);
    }
  }
  render() {
    const { choices, question_lines, isPreviewer } = this.props;
    const quizAnswers =  [];
    let questionLineItem = [];
    if(!this.props.answered && !isPreviewer) {
      for (let key in choices) {
        let choice = choices[key];
        quizAnswers.push(
          <QuizAnswerItem key={key}>
            <div className="label">
              {key}
            </div>
            <div className="content">
              {choice}
            </div>
          </QuizAnswerItem>
        );
      }
    }else{
      const {right_answer,answer} = this.props;
      for (let key in choices) {
        let choice = choices[key];
        const isUserAnswer = isPreviewer ? (right_answer == key) : (answer == key);
        quizAnswers.push(
          <QuizAnswerItemAnswered key={key} isRightAnswer={right_answer==key} isUserAnswer={isUserAnswer}>
            <div className="label">
              {key}
            </div>
            <div className="content">
              {choice}
            </div>
          </QuizAnswerItemAnswered>
        );
      }
    }

    if (question_lines instanceof Array) {
      questionLineItem = question_lines.map(function(d, i){
        return (<p key={i} dangerouslySetInnerHTML={{__html: d}}/>);
      });
    }
    return (
      <div className="quiz-item">
        <div className="quiz-num">
          {this.props.order}
        </div>
        <div className="quiz-title">
          {questionLineItem}
        </div>
        {this.props.answered?(
          <div>
           {quizAnswers}
           {this.props.comments?
             (<div className="quiz-comments">
              {this.props.comments}
             </div>):null}
          </div>
        ):(
          <QuizAnswers  handleIndexChange={this.handleAnswerIndexChange.bind(this, this.props.id)}>
           {quizAnswers}
          </QuizAnswers>
        )}

      </div>

    );
  }
}

export default class Quiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizAnswers : {},
      showToast   : false,
      toastStatus : '',
      toastMsg    : '',
    }
  }

  checkAnswered(){
    const {quizes} = this.props;
    if(quizes instanceof Array){
      for(let i=0;i<quizes.length;i++){
        if(!quizes[i].answered){
          return false;
        }
      }
      return true;
    }
    return false;
  }

  getQuizItems() {
    const { quizes, isPreviewer } = this.props;
    console.log('quizes');
    console.log(quizes);
    if (quizes instanceof Array) {
      const o = this;

      return quizes.map((item) =>
        <QuizItem
          question_lines={item.question_lines}
          choices = {item.choices}
          order = {item.order}
          answer = {item.answer}
          answered = {item.answered}
          right_answer = {item.right_answer}
          key={item.id}
          id = {item.id}
          comments={item.comments}
          handleAnswerIndexChange={o.handleAnswerIndexChange.bind(o)}
          isPreviewer={isPreviewer}
        />
      );
    } else {
      return [];
    }
  }

  handleAnswerIndexChange(quizId, quizAnswer) {
    let { quizAnswers } = this.state;
    quizAnswers[quizId] = quizAnswer;
    this.setState({ quizAnswers });
    console.log('quiz answer');
    console.log(quizAnswers);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Quiz will receive props');
    const pre_submit_quiz = this.props.cur_submit_quiz;
    const { cur_submit_quiz, history, location,actions } = nextProps;
    const lesson_id = this.props.match.params.id;
    const course_id = this.props.match.params.course_id;
    const page_name = this.props.match.params.page_name;
    const parent_path = location.pathname.split('/')[1];
    const probation = (parent_path == 'quiz-probation')?'-probation':'';

    console.log('cur submit quiz');
    console.log(cur_submit_quiz);
    if (cur_submit_quiz.submitting_quiz) {
      this.setState({
        showToast   : true,
        toastStatus : 'loading',
        toastMsg    : '正在提交',
      });
    } else if (cur_submit_quiz.error_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'fail',
        toastMsg    : '提交失败',
      });
    } else if (cur_submit_quiz.success_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'success',
        toastMsg    : '提交成功',
      });
    }
    if(pre_submit_quiz.submitting_quiz&&!cur_submit_quiz.submitting_quiz&&cur_submit_quiz.success_info){
      actions.fetchLessonPage(lesson_id,course_id,page_name);
    }
  }

  handleSubmit() {
    const { actions, quizes }  = this.props;
    const lesson_id = this.props.match.params.id;
    const course_id = this.props.match.params.course_id;
    const { quizAnswers } = this.state;
    for (let i = 0; i < quizes.length; i++) {
      if (!quizAnswers[quizes[i].id]) {
        this.setState({
          showToast : true,
          toastMsg  : '还有答案未填写',
        });
        return;
      }
    }

    actions.submitQuizAnswer(quizAnswers, lesson_id,course_id);
  }

  componentDidMount() {
    console.log('Quiz did mount');
  }


  render() {
    console.log('Quiz render');
    const quizItems = this.getQuizItems();
    const answered = this.checkAnswered();
    const { isPreviewer } = this.props;
    return (
      <div className="quiz">
        {quizItems}
        <br/>
        <br/>
        {(!answered && !isPreviewer)?(<Button onClick={this.handleSubmit.bind(this)}>做完，提交答案</Button>):null}
        <Toast
          show={false}
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
      </div>
    );
  }
}
