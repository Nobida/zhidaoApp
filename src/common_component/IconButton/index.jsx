//== BottomNav
//

import React from 'react';

// icon button item

class IconButton extends React.Component {
  constructor(props) {
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
          case 'xs':
              return 'xs';
          default:
              return 'md';
      }
  }
  render() {
    let className = this.props.inverse?"icon-button inverse":"icon-button";
    className += " "+this.getSizeClassName()
    return (
      <div className={this.props.className?'icon-button-container '+this.props.className:'icon-button-container'}>
        <div className={className}
             onClick={this.props.onClick}
        >
            {this.props.icon}
        </div>
        {this.props.label?(<div className="label">{this.props.label}</div>):null}
      </div>
    );
  }
}
export default IconButton;