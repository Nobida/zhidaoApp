import React from 'react';
import NoteItem from '../../../common_component/NoteItem';
import QuestionFavor from '../QuestionFavor';

export default class AnswerList extends React.Component{
  constructor(props) {
    super(props);
  }

  onToggleFavor(answerID, rated) {
    const { actions, user_id, user_avatar } = this.props;
    const userData = {
      id: user_id,
      avatar: user_avatar,
    };
    actions.toggleFavorOfAnswer(answerID, rated, userData);
  }

  onClickItemDelete(answerToDelete) {
    this.props.onClickItemDelete(answerToDelete);
  }

  needForceUpdateAnswers() {
    if (this.props.answers_need_update && !this.props.fetching_answers){
      return true;
    }
    return false;
  }

  needGetNextPageOfAnswers() {
    const { reachBottom, next_answers_page, fetching_answers } = this.props;
    if (fetching_answers || !next_answers_page) {
      return false;
    }
    return reachBottom;
  }

  componentDidMount() {
    const { actions } = this.props;
    const questionID = this.props.questionID;
    actions.fetchQuestionAnswers(questionID, 1);
  }

  componentDidUpdate() {
    const { actions, next_answers_page } = this.props;
    const questionID = this.props.questionID;
    if (this.needForceUpdateAnswers()) {
      console.log("need force update answers");
      actions.fetchQuestionAnswers(questionID, 1);
    } else if (this.needGetNextPageOfAnswers()) {
      console.log("need get next page of answers");
      actions.fetchQuestionAnswers(questionID, next_answers_page);
    }
  }

  render(){
    return(
      <div className="question-answers">
        {this.props.answers.map(item => (
          <div key={item.uuid}>
            <NoteItem
              type="question"
              avatar={item.avatar}
              nickname={item.nickname}
              time={item.create_dt}
              content={item.contents}
              rated={item.rated}
              own={item.user == this.props.user_id}
              showFavor={true}
              onToggleFavor={this.onToggleFavor.bind(this, item.uuid, item.rated)}
              onDeleteClick={this.onClickItemDelete.bind(this, item.uuid)}
            />
            <QuestionFavor
              rating={ item.rating }
              latest_ratings={ item.latest_ratings }/>
          </div>
        ))}
      </div>
    )
  }
}