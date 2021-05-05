import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { TabItem, TabContainer } from "../../common_component/Tabs";
import CourseList from '../CourseList';
import {withRouter} from 'react-router';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curTab: 0,
      doInitScroll: true,
    }
  }


  componentDidMount() {
    const {history} = this.props;
    const {type} = this.props.match.params;
    if(type=='daily-reading')
      this.setState({curTab:1})
  }

  render(){
    const {curTab} = this.state
    const {type,course_id} = this.props.match.params;
    return(
      <div className="note-list-drawer">
        <TabContainer className="tabs-fixed-top" activeItem={this.state.curTab} >
          <TabItem>课程列表</TabItem>
        </TabContainer>
        <CourseList/>
      </div>
    )
  }
}
export default withRouter(Home)