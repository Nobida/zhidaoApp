import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import { fetchBooks } from "../../actions/book";
import UserBookNotes from './UserBookNotes';

const mapStateToProps = (state) => {
  const { user_stat, books } = state;
  return {
    user_stat: user_stat.stat,
    fetching_user_stat: user_stat.fetching_user_stat,
    booksData: books.books,
    fetching_books: books.fetching_books,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserStat,
      fetchBooks,
    },dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserBookNotes);
