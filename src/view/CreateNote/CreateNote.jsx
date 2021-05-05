import React from 'react';
import Button from '../../common_component/Button'
import TextArea from '../../common_component/TextArea';
import Toast from '../../common_component/Toast';
import './style.scss';

export default class CreateNote extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contents: '', showToast: false };
  }

  handleNoteContentInput(val) {
    this.setState({ contents: val });
  }

  createNote() {
    const { cur_selection, actions } = this.props;
    const { contents } = this.state;
    this.setState({
      showToast: true
    });
    const { source_type, round_table_id } = this.props.match.params;
    if (source_type === 'round-table') {
      actions.createNote('normal', cur_selection, contents, '', round_table_id);
    } else {
      actions.createNote('normal', cur_selection, contents, '');
    }
  }

  goBack() {
    const { lesson_info, history } = this.props;
    // if (lesson_info) {
      history.goBack();
    // }
  }

  componentWillReceiveProps(nextProps) {
    console.log('CreateNote will receive props');
    if (this.props.cur_post.posting && nextProps.cur_post.success_info) {
      this.goBack();
    } else {
      this.setState({ showToast: true });
    }
  }

  render() {
    console.log('CreateNote render');
    const { cur_selection, cur_post } = this.props;
    let selection_contents = cur_selection.contents;
    selection_contents = selection_contents?selection_contents.split('\n'):null;
    const post_status = cur_post.posting?'loading':
                        cur_post.error_info?'fail':
                        cur_post.success_info? 'success':'';
    const toast_message = cur_post.posting?'正在发布...':
                          cur_post.error_info?'发布失败':
                          cur_post.success_info? '发布成功':'';
    return (
      <div className="create-note">
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
          onInput={this.handleNoteContentInput.bind(this)}
          placeholder="点此输入笔记内容，如果不填写任何内容您的笔记将不会被别人看到"
        />
        <div className="create-bottom">
          <Button onClick={this.goBack.bind(this)} type="ghost">取消</Button>
          <Button onClick={this.createNote.bind(this)}>保存</Button>
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
