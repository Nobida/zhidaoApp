import React from 'react';
import { Link } from 'react-router-dom';


export default class HrefLink extends React.Component {
  render() {
    const { href, children } = this.props;
    if (typeof(href) != "string") {
      console.error("HrefLink must have a herf property with string type");
      return (<a>{children}</a>);
    }
    if (href.indexOf("http") == 0) {
      return (<a href={href}>{children}</a>);
    } else {
      return (<Link to={href}>{children}</Link>);
    }
  }
}
