import React from 'react';
import { INTRO_URL } from "../../api/const";
import BackToHome from '../../common_component/BackToHome';
import {checkProbationPath,checkShouldSetBackBtn,checkShouldPtuBackBtnToTop} from "../../utils/path_helper";
import {setCustom, trackPageView, closeAutoPageview, trackViewEvent, trackLogEvent} from "../../utils/cnzz_helper";
import './style.scss';
import Loadings from '../../common_component/Loadings'

export default class App extends React.Component {

  redirectIfNeeded() {

    const { today, courses, location, auth, history } = this.props;
    const firstPath = location.pathname.split('/')[1];
    // const course_flag = ((today.course_state == 'NO_COURSE') || (
    //       (today.course_state == 'NEW_COURSE') &&
    //       !courses.fetching_courses &&
    //       !courses.courses.length
    //     ));
    // const location_flag =  (location.pathname == '/' ||location.pathname == '/main/home'||location.pathname == '/main/reading-progress');
    /*if(course_flag && location_flag) {
      //if not the main path
      window.location.href = INTRO_URL+'?source=self_app';
      console.log('auth');
      console.log(auth.user_info);

    }else */{
      // if (!courses.fetching_courses && courses.courses.length && !auth.user_info.is_registered && (location.pathname == '/' || firstPath == 'main' || firstPath == 'reading')) {
      //   // if not registered
      //   const enrolled_courses = courses.courses.filter(function(d,i){return d.enrolled});
      //   if(enrolled_courses.length){
      //     history.replace('/register');
      //   }
      // }
      // if not registered
      // if(!auth.user_info.is_registered){
      //   history.replace('/register')
      // }
    }
  }

  setDefaultSharePage() {
    const { actions, location, sharePage,agent_type } = this.props;
    if ("punch" == location.pathname.split('/')[1]) {
      return;
    }
    if ("default" == sharePage) {
      return;
    }
    if(checkProbationPath(location) || agent_type=='PC'){
      return;
    }
    actions.setDefaultSharePage();
  }

  componentDidMount() {
    console.log('App did mount');
    const { actions,location, agent_type} = this.props;
    actions.setDefaultSharePage();
    setCustom();
    closeAutoPageview();
    trackPageView(location.pathname);
    trackLogEvent();
    //actions.fetchCourseList();
    actions.fetchToday();
    actions.fetchUserPerm();
    this.setState({startTime: new Date()});
    if(checkProbationPath(location) || agent_type=='PC'){
      return;
    }

    actions.fetchSignature(window.location.href.split('#')[0]);
  }
  // componentWillUnmount() {
  //     const {startTime} = this.state;
  //     const endTime = new Date();
  //     //trackViewEvent((endTime-startTime)/1000)
  // }
  // componentWillReceiveProps(nextProps){
  //    const {location} = this.props;
  //    const nextLocation = nextProps.location;
  //    // if(location.pathname != nextLocation.pathname){
  //    //   //trackPageView(nextLocation.pathname)
  //    // }
  // }

  render() {
    console.log('App render');
    this.redirectIfNeeded();


    const ifUnicom = this.props.location.pathname.split("/")[1]

    //this.setDefaultSharePage();
    const { today, courses, location,agent_type } = this.props;
    return (
      <div className={"app"}>
        {today.date?this.props.children:<Loadings/>}
        {/*{!courses.fetching_courses &&courses.courses.length&&today.date?this.props.children:<Loadings/>}*/}
        {checkShouldSetBackBtn(location) && agent_type!='PC' && ifUnicom !='ad-page-unicom' ?(<BackToHome position={checkShouldPtuBackBtnToTop(location)?'top':null}/>):null}
      </div>
    );
  }
}
