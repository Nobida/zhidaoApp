import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setCurHighlight } from "../../actions/cur_highlight";
import {
  fetchRoundTableNote,
  fetchRoundTableQuestion,
  fetchRoundTablePost,
  fetchRoundTableMedia,
} from "../../actions/round_table";
import {
  deleteNote,
  toggleFavorOfNote
} from "../../actions/note";
import {
  deleteQuestion,
  toggleFavorOfQuestion
} from "../../actions/question";
import {
  deletePost,
  toggleFavorOfPost
} from "../../actions/post";
import RoundTableContent from './RoundTableContent';

const mapStateToProps = (state) => {
  const { auth, round_table_content, cur_delete } = state;
  return {
    user_id: auth.user_info.id,
    round_table_content,
    cur_delete
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurHighlight,
      deleteNote,
      deleteQuestion,
      deletePost,
      toggleFavorOfNote,
      toggleFavorOfQuestion,
      toggleFavorOfPost,
      fetchRoundTableNote,
      fetchRoundTableQuestion,
      fetchRoundTablePost,
      fetchRoundTableMedia
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoundTableContent)
);
