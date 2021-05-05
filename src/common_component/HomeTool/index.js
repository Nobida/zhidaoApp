//== Home Tool
//

import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '../IconButton';
import {} from '../../svg';
class HomeTool extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to='/home'>
        <IconButton />
      </Link>
    );
  }
}
export default Icon;