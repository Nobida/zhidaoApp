//== BottomNav
//

import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';

// BottomNav item

class BottomNavItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <SwitchLayoutItem className="nav-item"
               active={this.props.active}
               onClick={this.props.onClick}
               splitSize={this.props.splitSize}>
          <div className="nav-icon">
              {this.props.icon}
          </div>
        {this.props.label?(
          <div className="nav-label">{this.props.label}</div>
        ):null}
      </SwitchLayoutItem>
    );
  }
}

// BottomNav Container

class BottomNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let childSize = this.props.children?this.props.children.length:0;
    return (
      <SwitchLayoutContainer className={this.props.shadow?"bottom-nav shadow":"bottom-nav"}
                          activeItem={this.props.activeItem}
                             splitSize={childSize}
                    handleIndexChange={this.props.handleIndexChange}>
          {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}
export {BottomNavItem,BottomNav};


