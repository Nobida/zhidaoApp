//== Tabs
//

import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';

// NavTab Item

class NavTabItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SwitchLayoutItem className={this.props.className?"tab-item "+this.props.className:"tab-item"}
               active={this.props.active}
               splitSize={this.props.splitSize}
               value={this.props.value} 
               onClick={this.props.onClick}>
                 <div className='tab-item-content'>
                    {this.props.children}
                 </div> 
      </SwitchLayoutItem>
    );
  }
}

class NavContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return ( 
            <div className={this.props.className?'nav-content '+this.props.className:'nav-content'}>
                {this.props.children}
            </div>
        )
    }
}

// Tab Container

class NavTabContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    let childSize = this.props.children?this.props.children.length:0;
    return (
      <SwitchLayoutContainer
              className="nav-tab-container"
              activeItem={this.props.activeItem}
              value={this.props.value}
              handleIndexChange={this.props.handleIndexChange}
              splitSize={childSize}
      >
          {this.props.children}
      </SwitchLayoutContainer>
    );
  }
}


// Nav Head

class NavHead extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){ 
    return (
      <div className='nav-head'>
        {this.props.children}
      </div>
    )
  }
}

export {NavTabContainer, NavTabItem, NavHead, NavContent};


