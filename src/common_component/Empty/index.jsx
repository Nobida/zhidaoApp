// Empty

import React from 'react';
import {empty} from "../../svg";

class Empty extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = "empty";
    return (
      <div className={className}>
        {empty}
        <div>本来无一物，何处惹尘埃</div>
      </div>
    );
  }
}
export default Empty;