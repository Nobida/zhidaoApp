/**
 * Avatar
 */

import React from "react";
import {DEFAULT_AVATAR} from "../../api/const";

class Avatar extends React.Component {

  constructor(props){
      super(props);
  }
  getSizeClassName(){
      switch (this.props.size){
          case 'xs':
              return 'tiny';
          case 'sm':
              return 'small';
          case 'md':
              return 'middle';
          case 'bg':
              return 'big';
          case 'lg':
              return 'large';
          default:
              return 'middle';
      }
  }
  render() {
    let className = "avatar " + this.getSizeClassName();
    return(
        <div
            className={this.props.className?className+" "+this.props.className:className}
        > 
           <img src={this.props.src?this.props.src:DEFAULT_AVATAR}/>
        </div>
    )
  }
}

export default Avatar;
