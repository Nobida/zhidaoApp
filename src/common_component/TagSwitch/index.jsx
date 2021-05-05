//== Tabs
//

import React from 'react';
import {SwitchLayoutContainer} from '../SwitchLayout';
import Tag from '../Tag'
// NavTab Item

class TagItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Tag size='sm' type={this.props.active?'brand':'optional'} onClick={this.props.onClick} value={this.props.value}>
            {this.props.children}
        </Tag>
    ); 
  }
}

// TagSwitchContainer

class TagSwitchContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <SwitchLayoutContainer
              className="tag-switch-container"
              activeItem={this.props.activeItem}
              handleIndexChange={this.props.handleIndexChange}
              value={this.props.value}
      >
          {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}



export {TagSwitchContainer,TagItem};


