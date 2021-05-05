import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReply } from '../../../actions/reply';
import Button from '../../../common_component/Button';
import { Drawer } from '../../../common_component/Drawer';
import Icon from '../../../common_component/Icon';
import { heart, heart_solid } from '../../../svg';

class PostBottom extends React.Component {
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

  postReply() {
    this.props.hideReplyDrawer();
    const { post, actions } = this.props;
    const { contents } = this.state;
    const formData = {
      post,
      contents
    };
    console.log(formData)
    actions.createReply(formData);
    this.setState({ contents: "" })
  }

  render(){
    return (
      <div>
        <div className="post-bottom">
          <div className="show-reply-input-button" onClick={this.props.showReplyDrawer}>写下你的回复</div>
          <Icon
            onClick={this.props.toggleFavorOfPost}
            icon={this.props.rated?heart_solid:heart} />
        </div>
        <Drawer upper pos="bottom" show={this.props.replyDrawerShow} onRequestClose={this.props.hideReplyDrawer}>
          <div className="reply-input-container" >
            <textarea className="reply-input" autoFocus={true} placeholder="输入内容"
            value={this.state.contents} onChange={this.onInputChange.bind(this)} />
            <div className="reply-submit-buttons">
              <Button onClick={this.postReply.bind(this)}>发布</Button>
              <Button onClick={this.props.hideReplyDrawer} type="ghost">取消</Button>
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
      createReply,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostBottom);
