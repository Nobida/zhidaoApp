/**
 * Tag
 */

import React from "react";
class Tag extends React.Component {

  constructor(props){
      super(props);
  }
  getSizeClassName(){
      switch (this.props.size){
          case 'sm':
              return 'sm';
          case 'md':
              return 'md';
          case 'lg':
              return 'lg';
          default:
              return 'md';
      }
  }
  getTypeClassName(){
    switch (this.props.type){
          case 'primary':
              return 'primary';
          case 'optional': 
              return 'optional';
          default:
              return 'brand';
      }
  }
  render() {
    let className = "tag-item " + this.getSizeClassName()+" " + this.getTypeClassName();
    return(
        <div
            className={this.props.className?className+" "+this.props.className:className}
            onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
    )
  }
}

export default Tag;
