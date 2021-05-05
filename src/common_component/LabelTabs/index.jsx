//== Tabs
//

import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';

// Tab Item

class LabelTabItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem className={this.props.className?"label-tab-item "+this.props.className:"label-tab-item"}
               active={this.props.active}
               onClick={this.props.onClick}>
            {this.props.children}
      </SwitchLayoutItem>
    );
  }
}

// Tab Container

class LabelTabContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className?"label-tabs "+this.props.className:"label-tabs"}>
          <SwitchLayoutContainer
              className="label-tab-container"
              activeItem={this.props.activeItem}
              handleIndexChange={this.props.handleIndexChange}
          >
              {this.props.children}
          </SwitchLayoutContainer>
      </div>
    );
  }
}
export {LabelTabItem,LabelTabContainer};
