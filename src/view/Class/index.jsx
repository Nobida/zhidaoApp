import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchBooks } from "../../actions/book";
import { setCourseToStore, fetchCourseByID,fetchCourseRankList } from "../../actions/course";
import Class from './Class';

const mapStateToProps = (state) => {
  const { books, courses, cur_course } = state;
  return {
    books: books,
    courses: courses,
    cur_course: cur_course.course,
    course_rank_list : cur_course.course_rank_list,
    fetching_course_rank_list: cur_course.fetching_course_rank_list
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchBooks,
      setCourseToStore,
      fetchCourseByID,
      fetchCourseRankList
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Class)
);
