/**
 * BackToHome
 */

import React from "react";
import {Link} from 'react-router-dom';
class BackToHome extends React.Component {

  constructor(props){
      super(props);
  }
  render() {
   return(
       <Link to="/main/home" className={this.props.position=='top'?"back-to-home top":"back-to-home"}>
         返回主页
       </Link>
    )
  }
}

export default BackToHome;
