import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchBooks } from "../../actions/book";
import { setCourseToStore, fetchCourseByID } from "../../actions/course";
import CourseIntro from './CourseIntro';

const mapStateToProps = (state) => {
  const { books, courses, cur_course } = state;
  return {
    books: books,
    courses: courses,
    cur_course,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchBooks,
      setCourseToStore,
      fetchCourseByID,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseIntro)
);
