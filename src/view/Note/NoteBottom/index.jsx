import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createComment } from '../../../actions/comment';
import Button from '../../../common_component/Button';
import { Drawer } from '../../../common_component/Drawer';
import Icon from '../../../common_component/Icon';
import { heart, heart_solid } from '../../../svg';

class NoteBottom extends React.Component {
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

  postComment() {
    this.props.hideCommentDrawer();
    const { note, actions } = this.props;
    const { contents } = this.state;
    const formData = {
      note,
      contents
    };
    console.log(formData)
    actions.createComment(formData);
    this.setState({ contents: "" })
  }

  render(){
    return (
      <div>
        <div className="note-bottom">
          <div className="show-comment-input-button" onClick={this.props.showCommentDrawer}>写下你的评论</div>
          <Icon
            onClick={this.props.toggleFavorOfNote}
            icon={this.props.rated?heart_solid:heart} />
        </div>
        <Drawer upper pos="bottom" show={this.props.commentDrawerShow} onRequestClose={this.props.hideCommentDrawer}>
          <div className="comment-input-container" >
            <textarea className="comment-input" autoFocus={true} placeholder="输入评论"
            value={this.state.contents} onChange={this.onInputChange.bind(this)} />
            <div className="comment-submit-buttons">
              <Button onClick={this.postComment.bind(this)}>发布</Button>
              <Button onClick={this.props.hideCommentDrawer} type="ghost">取消</Button>
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
      createComment,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteBottom);
