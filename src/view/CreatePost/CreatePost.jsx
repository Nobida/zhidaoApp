import React from 'react';
import Button from '../../common_component/Button'
import TextArea from '../../common_component/TextArea';
import Toast from '../../common_component/Toast';
import './style.scss';

export default class CreatePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contents: '', showToast: false };
  }

  handlePostContentInput(val) {
    this.setState({ contents: val });
  }

  createPost() {
    const { actions } = this.props;
    const { contents } = this.state;
    this.setState({
      showToast: true
    });
    const { source_type, round_table_id } = this.props.match.params;
    if (source_type === 'round-table') {
      actions.createPost(contents, '', round_table_id);
    }
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  componentWillReceiveProps(nextProps) {
    console.log('CreatePost will receive props');
    if (this.props.cur_post.posting && nextProps.cur_post.success_info) {
      this.goBack();
    } else {
      this.setState({ showToast: true });
    }
  }

  render() {
    console.log('CreatePost render');
    const { cur_post } = this.props;
    const post_status = cur_post.posting?'loading':
                        cur_post.error_info?'fail':
                        cur_post.success_info? 'success':'';
    const toast_message = cur_post.posting?'正在发布...':
                          cur_post.error_info?'发布失败':
                          cur_post.success_info? '发布成功':'';
    return (
      <div className="create-post">
        <TextArea
          className="create-input"
          autoFocus={true}
          onInput={this.handlePostContentInput.bind(this)}
          placeholder="输入内容"
        />
        <div className="create-bottom">
          <Button onClick={this.goBack.bind(this)}type="ghost">取消</Button>
          <Button onClick={this.createPost.bind(this)} >确定</Button>
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
