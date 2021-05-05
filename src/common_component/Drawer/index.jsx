// Drawer

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class DrawerContent extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
       let className = "drawer-content";
       return(
          <div className={this.props.className?className+" "+this.props.className:className}>
              {this.props.children}
          </div>
        )
    }

}
class DrawerItem extends React.Component{
    constructor(props) {
        super(props);
    }
    getPosClassName(){
        switch (this.props.pos){
            case 'left':
                return 'drawer-left';
            case 'bottom':
                return 'drawer-bottom';
            case 'right':
                return 'drawer-right';
            default:
                return 'drawer-left'
        }
    }
    getLevelClassName(){
        if(this.props.upper){
            return 'upper';
        }else{
            return '';
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
        let className = "drawer "+ this.getPosClassName()+" "+this.getSizeClassName()+" "+this.getLevelClassName();
        return(
          <div className={this.props.className?className+" "+this.props.className:className}>
              {this.props.showClose?(<div className="drawer-close" onClick={this.props.onRequestClose}/>):null}
              {this.props.children}
          </div>
        )
    }
}
class Drawer extends React.Component {
  constructor(props) {
    super(props);
  }
  getTransitionName(){
    switch (this.props.pos){
        case 'left':
            return 'drawer-left';
        case 'bottom':
            return 'drawer-bottom';
        case 'right':
            return 'drawer-right';
        default:
            return 'drawer-left'
    }
  }
  render() {

    let drawerOverlay = (
        <div className={this.props.uppper? "drawer-overlay upper":"drawer-overlay"} onClick={this.props.onRequestClose}/>
    );
    let drawer =(
            <DrawerItem
                className={this.props.className}
                size={this.props.size}
                pos={this.props.pos}
                onRequestClose={this.props.onRequestClose}
                showClose={this.props.showClose}
                upper={this.props.upper}
                key="1"
            >
                {this.props.children}
            </DrawerItem>);
    let transitionName = this.getTransitionName();

    return (
        <div className="drawer-container">
            <ReactCSSTransitionGroup
               transitionName={transitionName}
               transitionEnterTimeout={300}
               transitionLeaveTimeout={300}
            >
                {[this.props.show? drawer:null]}
            </ReactCSSTransitionGroup>
            {(this.props.show && !this.props.hideOverlay)? drawerOverlay:null}
        </div>

    );
  }
}
export {DrawerContent,Drawer};