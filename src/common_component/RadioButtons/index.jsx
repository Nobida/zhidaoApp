import React from 'react';
import {SwitchLayoutItem,SwitchLayoutContainer} from '../SwitchLayout';


export class RadioButtonContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
       <SwitchLayoutContainer
              className={this.props.className?"radio-buttons "+this.props.className:"radio-buttons"}
              activeItem={this.props.activeItem}
              handleIndexChange={this.props.handleIndexChange}
          >
              {this.props.children}
       </SwitchLayoutContainer>
    )
  }

}
export class RadioButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <SwitchLayoutItem className={this.props.className?"radio-button "+this.props.className:"radio-button"}
               active={this.props.active}
               onClick={this.props.onClick}>
            {this.props.children}
      </SwitchLayoutItem>
    );
  }
}
