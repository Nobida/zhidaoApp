
import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../../../common_component/SwitchLayout';
import Icon from '../../../common_component/Icon'
import './style.scss'

class MoreToolItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem className="more-tool-item"
               active={this.props.active}
               onClick={this.props.onClick} >
          <Icon className="tool-icon" icon={this.props.icon} size='xs'>
          </Icon>
        <div>
        {this.props.label}
        </div>
      </SwitchLayoutItem>
    );
  }
}

// ToolItem Container

class MoreTools extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let childSize = this.props.children?this.props.children.length:0;
    return (
      <SwitchLayoutContainer className="more-tools"
                          activeItem={this.props.activeItem}
                             splitSize={childSize}
                    handleIndexChange={this.props.handleIndexChange}>
          {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}
export {MoreToolItem,MoreTools};


