import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAnswer } from '../../../actions/answer';
import Button from '../../../common_component/Button';
import { Drawer } from '../../../common_component/Drawer';
import Icon from '../../../common_component/Icon';
import { heart, heart_solid } from '../../../svg';

class QuestionBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: "",
      showToast:false
    }
  }

  onInputChange(e) {
    this.setState({
      contents: e.target.value
    })
  }

  postAnswer() {
    this.props.hideAnswerDrawer();
    const { question, actions } = this.props;
    const { contents } = this.state;
    const formData = {
      question,
      contents
    };
    console.log(formData)
    actions.createAnswer(formData);
    this.setState({ contents: "" })
  }

  render(){
    return (
      <div>
        <div className="question-bottom">
          <div className="show-answer-input-button" onClick={this.props.showAnswerDrawer}>写下你的答案</div>
          <Icon
            onClick={this.props.toggleFavorOfQuestion}
            icon={this.props.rated?heart_solid:heart} />
        </div>
        <Drawer upper pos="bottom" show={this.props.answerDrawerShow} onRequestClose={this.props.hideAnswerDrawer}>
          <div className="answer-input-container" >
            <textarea className="answer-input" autoFocus={true} placeholder="输入答案"
            value={this.state.contents} onChange={this.onInputChange.bind(this)} />
            <div className="answer-submit-buttons">
              <Button onClick={this.postAnswer.bind(this)}>发布</Button>
              <Button onClick={this.props.hideAnswerDrawer} type="ghost">取消</Button>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createAnswer,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionBottom);
