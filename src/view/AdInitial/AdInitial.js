import React from 'react';
import AdPage from '../AdPage'
import AdPageUnicom from '../AdPageUnicom'
import Loadings from '../../common_component/Loadings';


export default class AdInitial extends React.Component {

  componentDidMount() {
    const {actions} = this.props;
    const{ course_id } = this.props.match.params
    actions.fetchLatestCourse(course_id)

  }


  render() {
    const{ course_id } = this.props.match.params
    const {new_course_id, fetching_latest_id} = this.props.cur_course;

    
　　 if (!fetching_latest_id && this.props.match.url.split('/')[1] !== 'ad-page-unicom' ) {
　　　　return <AdPage course_id={ course_id }/>
　　 }
    
    if (this.props.match.url.split('/')[1] === 'ad-page-unicom' ) {
      return <AdPageUnicom course_id = { course_id }/>
    }

    return (
      new_course_id ?
      ( <AdPage course_id={ new_course_id }/>
      ):null
    )
  }
}
