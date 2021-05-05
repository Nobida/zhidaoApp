import React from 'react';
import { connect } from 'react-redux';
import { BookPage } from "../../../common_component/BookPage";

class Background extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BookPage
        fontSize={this.props.fontSize}
        selection={this.props.selection}
        content={this.props.content}
        id="background"
        onNoteItemClick={this.props.onNoteItemClick}
        apikey={this.props.apikey}
        highlights={this.props.highlights}
        highlight={this.props.highlight}
        page_type='BG'
        onFootMarkClick={this.props.onFootMarkClick}
        handleSelection={this.props.handleSelection}>
        <div className="title-l2">背景</div>
        <p>
          我们已经学习了《俄狄浦斯王》的大部分内容，我们也已经知道了俄狄浦斯命运的逆转，对于俄狄浦斯来说真正难以接受的就是他杀了自己的父亲，玷污了自己的母亲，然而这就是他要面对的命运。今天我们阅读的文本是退场戏部分，到这里俄狄浦斯的故事最终告一段落。
        </p>
      </BookPage>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Background);