import React from 'react';
import Button from '../../Button';
export default class ConfirmButtons extends React.Component {

  constructor(props){
      super(props);
  }
  render() {
    return(
        <div className="confirm-buttons">
            <Button onClick={this.props.onConfirm}>确定</Button>
            <Button onClick={this.props.onCancel} type='ghost'>取消</Button>
        </div>
    )
  }
}