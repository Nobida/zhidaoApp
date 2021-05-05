// Loadings

import React from 'react';
import {loadings} from "../../svg/index";

class Loadings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = "loadings" + (this.props.inView ? " loadings-in-view" : "");
    return (
      <div className={className} style={{display: this.props.show?'block':'none'}}>
          {loadings}
      </div>
    );
  }
}
export default Loadings;