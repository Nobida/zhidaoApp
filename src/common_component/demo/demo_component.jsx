/**
 * demo_component.jsx
 *
 * Demo component file
 *
 */

import React from "react";
import {
  Component
} from 'react';

class DemoComponent extends Component {
  render() {
    var textStyle = {
      fontSize: 72,
      fontFamily: "sans-serif",
      color: "#333",
      fontWeight: "bold"
    };
    return (<div style={textStyle}>{this.props.count}</div>);
  }
}

export default DemoComponent;
