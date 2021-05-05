// Toast

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {loadings,check,close} from "../../svg";

class ToastItem extends React.Component{
    constructor(props) {
        super(props);
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
    getSizeClassName(){
        switch (this.props.size){
            case 'md':
                return 'drawer-md';
            case 'lg':
                return 'drawer-lg';
            case 'sm':
                return 'drawer-sm';
            default:
                return 'drawer-md'
        }
    }
    render(){
        const statusIcon = this.getStatusItem();
        return(
          <div className={this.props.className?"toast "+this.props.className:"toast"}>
            {statusIcon?(<div className="icon">{statusIcon}</div>):null}
              {this.props.message}
          </div>
        )
    }
}
export default class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couldShow: true
    }
  }
  componentDidMount(){
    if(this.props.show){
      let o = this;
      o.setState({couldShow:true});
      if(this.props.autoHide) {
        setTimeout(function () {
          o.setState({couldShow: false})
        }, this.props.autoHideTime ? this.props.autoHideTime : 2000)
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if((!this.props.show && nextProps.show)|| (this.props.status!=nextProps.status) || (this.props.message!=nextProps.message))
      {
        if(nextProps.show){
        let o = this;
        o.setState({couldShow:true});
        if(this.props.autoHide) {
          setTimeout(function () {
            o.setState({couldShow: false})
          }, nextProps.autoHideTime ? nextProps.autoHideTime : 3000)
        }
      }
    }
  }

  render() {

    let toast =(
            <ToastItem
                className={this.props.className}
                status = {this.props.status}
                key="1"
                message={this.props.message}
            >
            </ToastItem>);

    return (
        <div className="toast-container">
            <ReactCSSTransitionGroup
               transitionName="toast"
               transitionEnterTimeout={300}
               transitionLeaveTimeout={300}
            >
                {[(this.props.show && this.state.couldShow)? toast:null]}
            </ReactCSSTransitionGroup>
        </div>

    );
  }
}
