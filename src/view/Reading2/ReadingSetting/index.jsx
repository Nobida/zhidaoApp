import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTheme, setFontSize } from "../../../actions/reading_settings";
import { SwitchLayoutItem, SwitchLayoutContainer } from '../../../common_component/SwitchLayout';
import './style.scss';

class FontSettingItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchLayoutItem
        className="font-setting"
        active={this.props.active}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </SwitchLayoutItem>
    );
  }
}
class ThemeSettingItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchLayoutItem
        className={"bg-setting bg-" + this.props.theme}
        active={this.props.active}
        onClick={this.props.onClick}
      >
      </SwitchLayoutItem>
    )
  }
}
class SettingContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <SwitchLayoutContainer
        className="setting-content"
        activeItem={this.props.activeItem}
        defaultActiceItem={this.props.defaultActiveItem}
        handleIndexChange={this.props.handleIndexChange}
      >
        {this.props.children}
      </SwitchLayoutContainer>
    )
  }
}

class ReadingSetting extends React.Component {
  constructor(props) {
    super(props);
  }
  getFontSize(i) {
    switch (i) {
      case 0:
        return 'sm';
      case 1:
        return 'md';
      case 2:
        return 'lg';
      default:
        return 'md';
    }
  }
  getThemeIndex() {
    switch (this.props.reading_settings.theme) {
      case 'white':
        return 0;
      case 'yellow':
        return 1;
      case 'green':
        return 2;
      case 'dark':
        return 3;
      default:
        return 0;
    }
  }
  getFontSizeIndex() {
    switch (this.props.reading_settings.font_size) {
      case 'sm':
        return 0;
      case 'md':
        return 1;
      case 'lg':
        return 2;
      default:
        return 0;
    }
  }
  getTheme(i) {
    switch (i) {
      case 0:
        return 'white';
      case 1:
        return 'yellow';
      case 2:
        return 'green';
      case 3:
        return 'dark';
      default:
        return 'white';
    }
  }
  handleFontSizeChange(i) {
    const { actions } = this.props;
    let fontSize = this.getFontSize(i);
    actions.setFontSize(fontSize);
  }
  handleThemeChange(i) {
    const { actions } = this.props;
    let theme = this.getTheme(i);
    actions.setTheme(theme);
  }
  render() {
    let fontSizeIndex = this.getFontSizeIndex();
    let themeIndex = this.getThemeIndex();
    return (
      <div className="reading-setting">
        <div className="setting-item font-setting">
          <div className="setting-title">
            字体
          </div>
          <SettingContent activeItem={fontSizeIndex} handleIndexChange={this.handleFontSizeChange.bind(this)}>
            <FontSettingItem>小</FontSettingItem>
            <FontSettingItem>中</FontSettingItem>
            <FontSettingItem>大</FontSettingItem>
          </SettingContent>
        </div>
        <div className="setting-item theme-setting">
          <div className="setting-title">
            背景
          </div>
          <SettingContent activeItem={themeIndex} handleIndexChange={this.handleThemeChange.bind(this)}>
            <ThemeSettingItem theme="white" />
            <ThemeSettingItem theme="yellow" />
            <ThemeSettingItem theme="green" />
            <ThemeSettingItem theme="dark" />
          </SettingContent>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { reading_settings } = state;
  return {
    reading_settings,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setTheme,
      setFontSize,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ReadingSetting);
