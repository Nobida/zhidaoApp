//== FormItem
//

import React from 'react';

// form item

export default class FormItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const requiredTxt = this.props.required ? (
      <span style={{color: 'red'}}>（必填）</span>
    ) : null;
    return (
        <div className="form-item">
          {this.props.label?(
            <div className="form-label">{this.props.label}{requiredTxt}</div>
          ):null}
          {this.props.children}
        </div>
    );
  }
}