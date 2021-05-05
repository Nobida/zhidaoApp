//== Tabs
//

import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';

// Tab Item

class TabItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem className={this.props.className?"tab-item "+this.props.className:"tab-item"}
               active={this.props.active}
               onClick={this.props.onClick}>
            {this.props.children}
      </SwitchLayoutItem>
    );
  }
}

// Tab Container

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className?"tabs "+this.props.className:"tabs"}>
          <SwitchLayoutContainer
              className="tab-container"
              activeItem={this.props.activeItem}
              handleIndexChange={this.props.handleIndexChange}
          >
              {this.props.children}
          </SwitchLayoutContainer>
      </div>
    );
  }
}
export {TabItem,TabContainer};


