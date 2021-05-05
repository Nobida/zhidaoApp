//== Panel Selection
//

import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';

// Selection Item

class PanelSelectionItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem className={this.props.className?"panel-selection-item "+this.props.className:"panel-selection-item"}
               active={this.props.active}
               onClick={this.props.onClick}>
            {this.props.children}
      </SwitchLayoutItem>
    );
  }
}

// Panel Selection Container

class PanelSelectionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SwitchLayoutContainer
              className="panel-selection-container"
              activeItem={this.props.activeItem}
              handleIndexChange={this.props.handleIndexChange}
          >
              {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}
export {PanelSelectionItem,PanelSelectionContainer};


