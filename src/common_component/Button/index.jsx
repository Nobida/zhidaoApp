/**
 * Button
 */

import React from "react";

class Button extends React.Component {

  constructor(props){
      super(props);
  }
  getTypeClassName(){
      switch (this.props.type){
           case 'ghost':
               return 'ghost';
           case 'inverse':
               return 'inverse';
           case 'label':
               return 'label';
            case 'primary':
              return 'primary';
            default:
              return '';
      }
  }
  getSizeClassName(){
      switch (this.props.size){
          case 'sm':
              return 'small';
          case 'md':
              return 'middle';
          case 'lg':
              return 'large';
          default:
              return 'middle';
      }
  }
  render() {
    let className = "button " + this.getSizeClassName()+" " + this.getTypeClassName();
    return(
        <div onClick={this.props.onClick} className={this.props.className? className+" "+this.props.className : className}>
            {this.props.children}
        </div>
    )
  }
}

export default Button;
