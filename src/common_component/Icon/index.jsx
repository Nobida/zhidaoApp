//== BottomNav
//

import React from 'react';
import {Link} from 'react-router-dom';

// icon item

class Icon extends React.Component {
  constructor(props) {
    super(props);
  }
  getSizeClassName(){
      switch (this.props.size){
          case 'sm':
              return 'icon-sm';
          case 'md':
              return 'icon-md';
          case 'lg':
              return 'icon-lg';
          case 'xs':
              return 'icon-xs';
          default:
              return 'icon-md';
      }
  }
  render() {
    return (

        <div onClick={this.props.onClick?this.props.onClick:null}
          className={this.props.className?"icon-container "+this.getSizeClassName()+" " +this.props.className:'icon-container '+this.getSizeClassName()}>
          <div className={"icon "+this.getSizeClassName()} >
            {this.props.icon}
            <div className="click-panel"></div>
          </div>

            {this.props.label?(
              <div className="label">
                  {this.props.label}
              </div>
            ):null}
        </div>
    );
  }
}
export default Icon;