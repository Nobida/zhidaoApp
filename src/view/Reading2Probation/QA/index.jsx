import React from 'react';
import { connect } from 'react-redux';
import { BookPage } from "../../../common_component/BookPage";

class QA extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BookPage
        fontSize={this.props.fontSize}
        selection={this.props.selection}
        content={this.props.content}
        id="lecture"
        highlight={this.props.highlight}
        page_type='QA'
        onFootMarkClick={this.props.onFootMarkClick}
        theme={this.props.theme}
        handleSelection={this.props.handleSelection}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(QA);