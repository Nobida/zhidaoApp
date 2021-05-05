//== Text Area
//

import React from 'react';
import ReactDOM from 'react-dom';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }
  handleInput(){

      let textarea = ReactDOM.findDOMNode(this.refs.textarea);
      let value = $(textarea).val();
      $(textarea).css('height','auto');
      $(textarea).css('height',textarea.scrollHeight+'px');
      $(window).scrollTop($('body').height());
      if(this.props.onInput){
        this.props.onInput(value);
      }
  }
  render() {
    return (
      <textarea onInput={this.handleInput.bind(this)}
                className={this.props.className?this.props.className:''}
                autoFocus={this.props.autoFocus?true:false}
                placeholder={this.props.placeholder?this.props.placeholder:''}
                ref="textarea"/>
    );
  }
}
export default TextArea;


