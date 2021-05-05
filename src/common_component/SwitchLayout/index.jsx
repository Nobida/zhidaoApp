//== Tabs Layout
//

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  activeItem: PropTypes.number,
};
const itemTypes = {
    user: PropTypes.object,
    loggingIn: PropTypes.bool,
    loginErrors: PropTypes.string
};

// Switch item

class SwitchLayoutItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className={this.props.active? this.props.className+" active":this.props.className} onClick={this.props.onClick} style={this.props.splitSize?{width: (100.0/this.props.splitSize)+'%'}:null}>
          {this.props.children}
      </div>
    );
  }
}

class SwitchLayoutContainer extends React.Component {
  constructor(props) {
    super(props);
    if(!this.props.hasOwnProperty('activeItem') || this.props.activeItem == undefined){
        this.state = {
            activeItem: this.props.defaultActiveItem ? this.props.defaultActiveItem : 0,
            
        }
    }else{
        this.state = {
            activeItem: this.props.activeItem,
        }
    }
  }
  handleItemClick(i,value){
      if(!this.props.hasOwnProperty('activeItem')|| this.props.activeItem == undefined){
          this.setState({"activeItem" :i});
      }

      if(this.props.handleIndexChange)
          this.props.handleIndexChange(i,value)
  }
  componentWillReceiveProps(nextProps){

       if(nextProps.hasOwnProperty('activeItem') && nextProps.activeItem != undefined){
          this.setState({"activeItem" :nextProps.activeItem});
      }
      if(nextProps.hasOwnProperty('value') && nextProps.value != undefined && nextProps.children){
        for(let i=0;i<nextProps.children.length;i++){
          let child = nextProps.children[i] 
          if(child.props.value == nextProps.value){
            this.setState({'activeItem':i})
            break;
          }
        }
      }
  }
  componentDidMount(){
    if(this.props.hasOwnProperty('activeItem') && this.props.activeItem != undefined){
      this.setState({"activeItem" :this.props.activeItem});
  }
  if(this.props.hasOwnProperty('value') && this.props.value != undefined && this.props.children){
    for(let i=0;i<this.props.children.length;i++){
      let child = this.props.children[i] 
      if(child.props.value == this.props.value){
        this.setState({'activeItem':i})
        break;
      }
    }
  }
  }
  render() {

    let activeItem = this.state.activeItem;
    let value = this.state.value;
    let o = this;
    let splitSize = this.props.splitSize;

    let tabItems = React.Children.map(this.props.children, function (child,i) {
      
        return React.cloneElement(child, {
            onClick: o.handleItemClick.bind(o,i,child.props.value),
            active: activeItem == i || (child.props.value && value == child.props.value),
            splitSize: splitSize,
            key: i
        });
    }); 

    return (
      <div className={this.props.className}>
          {tabItems}
      </div>
    );
  }
}
export {SwitchLayoutItem,SwitchLayoutContainer};


