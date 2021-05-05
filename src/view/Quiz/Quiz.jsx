import React from 'react';
import Button from '../../common_component/Button';
import Toast from '../../common_component/Toast';
import { SwitchLayoutItem, SwitchLayoutContainer } from '../../common_component/SwitchLayout';
import {trackPunchEvent} from "../../utils/cnzz_helper";
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
    const { choices, question_lines } = this.props;
    const quizAnswers =  [];
    let questionLineItem = [];
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
        <QuizAnswers handleIndexChange={this.handleAnswerIndexChange.bind(this, this.props.id)}>
          {quizAnswers}
        </QuizAnswers>
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

  getQuizItems() {
    const { quizes } = this.props;
    if (quizes instanceof Array) {
      const o = this;
      return quizes.map(item =>
        <QuizItem
          question_lines={item.question_lines}
          choices = {item.choices}
          order = {item.order}
          key={item.id}
          id = {item.id}
          handleAnswerIndexChange={o.handleAnswerIndexChange.bind(o)}
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

  handleSubmit() {
    const { actions, quizes, location }  = this.props;
    const lesson_id = this.props.match.params.lesson_id;
    const course_id = this.props.match.params.course_id;
    const { quizAnswers } = this.state;
    const parent_path = location.pathname.split('/')[1];
    for (let i = 0; i < quizes.length; i++) {
      if (!quizAnswers[quizes[i].id]) {
        this.setState({
          showToast : true,
          toastMsg  : '还有答案未填写',
        });
        return;
      }
    }
    if(parent_path == 'quiz') {
      trackPunchEvent();
      actions.submitQuizAnswer(quizAnswers, lesson_id,course_id);
    }else{
      actions.submitQuizAnswerMock(quizAnswers, lesson_id,course_id);
    }
  }

  componentDidMount() {
    console.log('Quiz did mount');
    const { actions } = this.props;
    const lesson_id = this.props.match.params.lesson_id;
    const course_id = this.props.match.params.course_id;
    if (lesson_id) {
      actions.clearSubmitQuiz();
      actions.fetchQuizset(lesson_id,course_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('Quiz will receive props');
    const { cur_submit_quiz, history, location } = nextProps;
    const lesson_id = this.props.match.params.lesson_id;
    const course_id = this.props.match.params.course_id;
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

      setTimeout(function(){

        history.replace('/punch'+probation+'/'+lesson_id);
      }, 500);
    }
  }

  render() {
    console.log('Quiz render');
    const quizItems = this.getQuizItems();
    return (
      <div className="quiz">
        {quizItems}
        <br/>
        <br/>
        <Button onClick={this.handleSubmit.bind(this)}>做完，提交答案</Button>
        <Toast
          show={this.state.showToast}
          autoHide
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
      </div>
    );
  }
}
