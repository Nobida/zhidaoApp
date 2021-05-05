import React from 'react';
import Button from '../../common_component/Button'
import TextArea from '../../common_component/TextArea';
import Toast from '../../common_component/Toast';
import {checkQustionAuth} from "../../utils/auth_helper";
import Switch from '../../common_component/Switch';
import './style.scss';

export default class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: '',
      showToast: false,
      isThinking: false,
      isSticky: false
    };
  }

  handleQuestionContentInput(val) {
    this.setState({ contents: val });
  }

  createQuestion() {
    const { cur_selection, cur_course, actions } = this.props;
    const { contents,isThinking,isSticky } = this.state;
    const type = isThinking?'assignment':'normal';
    this.setState({
      showToast: true
    });
    const { source_type, round_table_id } = this.props.match.params;
    if (source_type === 'round-table') {
      actions.createQuestion(isSticky, type, cur_selection, contents, '', '', round_table_id);
    } else {
      const courseID = cur_course.course.uuid;
      actions.createQuestion(isSticky, type, cur_selection, contents, '', courseID);
    }
  }

  goBack() {
    const { lesson_info, history } = this.props;
    // if (lesson_info) {
      history.goBack();
    // }
  }
  handleThinkingSwitch(){
    const {isThinking} = this.state;
    this.setState({isThinking: !!!isThinking});
  }
  handleStickySwitch(){
    const {isSticky} = this.state;
    this.setState({isSticky: !!!isSticky});
  }

  componentWillReceiveProps(nextProps) {
    console.log('CreateQuestion will receive props');
    if (this.props.cur_post.posting && nextProps.cur_post.success_info) {
      this.goBack();
    } else {
      this.setState({ showToast: true });
    }
  }

  render() {
    console.log('CreateQuestion render');
    const { cur_selection, cur_post, user_perm } = this.props;
    const { isThinking, isSticky } = this.state;
    let selection_contents = cur_selection.contents;
    selection_contents = selection_contents?selection_contents.split('\n'):null;
    const post_status = cur_post.posting?'loading':
                        cur_post.error_info?'fail':
                        cur_post.success_info? 'success':'';
    const toast_message = cur_post.posting?'正在发布...':
                          cur_post.error_info?'发布失败':
                          cur_post.success_info? '发布成功':'';
    return (
      <div className="create-question">
        {selection_contents?(
          <div className="quote">
            {selection_contents.map(function(d,i){
              return (<p key={i}>{d}</p>)
            })}
          </div>
        ):null}
        <TextArea
          className="create-input"
          autoFocus={true}
          onInput={this.handleQuestionContentInput.bind(this)}
          placeholder="输入问题"
        />

        {/*是否有思考题权限*/}
        {user_perm.create_assignment && (
          <div className='thinking-check-container'>
            <div className="thinking-check">作为思考题发布
              <Switch checked={isThinking} onChange={this.handleThinkingSwitch.bind(this)}/>
            </div>
            <div className="thinking-check">置顶
              <Switch checked={isSticky} onChange={this.handleStickySwitch.bind(this)}/>
            </div>
          </div>
          )
        }
        <div className="create-bottom">
          <Button onClick={this.goBack.bind(this)} type="ghost">取消</Button>
          <Button onClick={this.createQuestion.bind(this)} >确定</Button>
        </div>
        <Toast
          status={post_status}
          autoHide
          show={this.state.showToast}
          message={toast_message}
        />
      </div>
    );
  }
}
