import React from 'react';
import ReactDOM from 'react-dom';
import {loadings,check,close} from "../../svg/index";

export default class TextField extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInput(e){
      if(this.props.onInput){
        this.props.onInput(e.target.value);
      }
  }
  componentDidMount(){
    let textField = ReactDOM.findDOMNode(this.refs.textField);
    $(textField).focus(function(){
      $(this).parent().addClass("is-active is-completed");
    });
    if(this.props.value != ""){
      $(textField).parent().addClass("is-completed");
    }
    
    var that = this;
    $(textField).focusout(function(){
      if(that.props.value === "")
        $(this).parent().removeClass("is-completed");
      $(this).parent().removeClass("is-active");
    })
  }
  componentWillReceiveProps(nextProps){
    let textField = ReactDOM.findDOMNode(this.refs.textField);
    if(nextProps.value){
      $(textField).parent().addClass("is-completed");
    }
  }

  getStatusItem(){
      switch (this.props.status){
        case 'loading':
          return loadings;
        case 'success':
          return check;
        case 'fail':
          return close;
        default:
          return null;
      }
    }
  render() {
    const statusItem = this.getStatusItem();
    const requiredTxt = this.props.required ? (
      <span style={{color: 'red'}}>（必填）</span>
    ) : null;
    return (
     <div className="input-div">
        <label className="input-label">{this.props.label}{requiredTxt}</label>
       {statusItem?(<div className='input-status'>{statusItem}</div>):null}
        <input type="text"
               onInput={this.handleInput.bind(this)}
               onChange={this.handleInput.bind(this)}
               className="text-input"
               value={this.props.value}
               ref="textField"/>
     </div>
    );
  }
}
