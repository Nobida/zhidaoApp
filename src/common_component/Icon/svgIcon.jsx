//== BottomNav
//

import React from 'react';

// icon item

class SvgIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={this.props.className?"icon-container "+this.props.className:'icon-container'}>
          <div className={"icon "+this.getSizeClassName()}>
              <img src={this.props.src}/>

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
export default SvgIcon;