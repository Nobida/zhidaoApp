/**
 * Card
 */

import React from "react";

class Card extends React.Component {

  constructor(props){
      super(props);
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
    let className = "card " + this.getSizeClassName() + (this.props.className?' '+this.props.className:'');
    return(
        <div className={className}>
          <img className="card-bg" src={this.props.bg}/>
          <div className="card-info">
            {this.props.children}
          </div>
        </div>
    )
  }
}

export default Card;
