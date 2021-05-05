import React from 'react';
import NoteItem from '../../common_component/NoteItem';
import QuestionFavor from './QuestionFavor';
import QuestionBottom from './QuestionBottom';
import AnswerList from './AnswerList';
import Loadings from '../../common_component/Loadings';
import { Drawer } from "../../common_component/Drawer";
import Button from "../../common_component/Button";
import './style.scss';

export default class Question extends React.Component {

  constructor(props){
    super(props);
    this.state={
      showAnswerDrawer: false,
      reachBottom: false,
      showDeleteDrawer: false,
      answerToDelete: null,
    }
  }

  showAnswerDrawer(){
    this.setState({
      showAnswerDrawer: true,
      showDeleteDrawer: false,
    })
  }

  hideAnswerDrawer(){
    this.setState({showAnswerDrawer: false})
  }

  showDeleteDrawer() {
    this.setState({
      showDeleteDrawer: true,
      showAnswerDrawer: false,
    })
  }

  hideDeleteDrawer() {
    this.setState({showDeleteDrawer: false})
  }

  getQuestionFromQuestions(questionID) {
    const { questions } = this.props;
    for (const question of questions) {
      if (question.uuid == questionID) {
        return question;
      }
    }
    return null;
  }

  toggleFavorOfQuestion(rated) {
    const { actions } = this.props;
    const questionID = this.props.match.params.id;
    actions.toggleFavorOfQuestion(questionID, rated);
  }

  needForceUpdateQuestion() {
    if (this.props.question_need_update && !this.props.fetching_question){
      console.log("need force update question");
      return true;
    }
    return false;
  }

  needUpdateQuestion() {
    const { fetching_question, cur_question, match } = this.props;
    if (fetching_question || (cur_question.uuid == match.params.id)) {
      return false;
    }
    console.log("need update question");
    return true;
  }

  handleAnswerListScroll(e) {
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const reachBottom = (clientHeight + scrollTop == scrollHeight);
    if (reachBottom != this.state.reachBottom) {
      console.log("reachBottom: "+reachBottom);
      this.setState({ reachBottom });
    }q
  }

  onClickItemDelete(answerToDelete) {
    console.log("answerToDelete: " + answerToDelete);
    this.setState({ answerToDelete });
    this.showDeleteDrawer();
  }

  handleQuestionDelete() {
    const questionID = this.props.match.params.id;
    const { actions } = this.props;
    actions.deleteAnswer(this.state.answerToDelete, questionID);
    this.hideDeleteDrawer();
  }

  componentDidMount() {
    console.log('Question did mount');
    const { actions } = this.props;
    const questionID = this.props.match.params.id;
    if (this.needForceUpdateQuestion()) {
      actions.fetchQuestionByID(questionID);
    } else if (this.needUpdateQuestion()) {
      let question = this.getQuestionFromQuestions(questionID);
      if (question) {
        console.log("get question from questions success");
        actions.setQuestionToStore(question);
      } else {
        actions.fetchQuestionByID(questionID);
      }
    }
  }

  componentDidUpdate() {
    console.log('Question did update');
    const { actions } = this.props;
    const questionID = this.props.match.params.id;
    if (this.needForceUpdateQuestion()) {
      actions.fetchQuestionByID(questionID);
    }
  }

  render() {
    console.log('Question render');
    const questionID = this.props.match.params.id;
    if (this.props.cur_question.uuid != questionID) {
      return(
        <Loadings show={true}/>
      );
    }
    const question = this.props.cur_question;
    return(
      <div className="question" onScroll={this.handleAnswerListScroll.bind(this)}>
        <NoteItem
          type="question"
          avatar={ question.avatar }
          nickname={ question.nickname }
          time={ question.create_dt }
          content={ question.contents }
          quote={ question.selection.contents }
          own={ false && (question.user == this.props.user_id) }
          showFavor={ false }/>
        <QuestionFavor
          rating={ question.rating }
          latest_ratings={ question.latest_ratings }/>
        <AnswerList
          questionID={questionID}
          onClickItemDelete={this.onClickItemDelete.bind(this)}
          reachBottom={this.state.reachBottom} />
        <QuestionBottom
          rated={question.rated}
          question={questionID}
          answerDrawerShow={this.state.showAnswerDrawer}
          toggleFavorOfQuestion={this.toggleFavorOfQuestion.bind(this, question.rated)}
          showAnswerDrawer={this.showAnswerDrawer.bind(this)}
          hideAnswerDrawer={this.hideAnswerDrawer.bind(this)} />
        <Drawer show={this.state.showDeleteDrawer}
          className="delete-question-container"
          hideOverlay={true}
          pos="bottom"
          showClose
          onRequestClose={this.hideDeleteDrawer.bind(this)}>
          <div className="delete-content">
            <p>确定要删除吗</p>
            <div className="button-tools">
              <Button onClick={this.handleQuestionDelete.bind(this)}>确定</Button>
              <Button onClick={this.hideDeleteDrawer.bind(this)} type='ghost'>取消</Button>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}
