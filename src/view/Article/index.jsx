import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchArticle } from "../../actions/article";
import Article from './Article';

const mapStateToProps = (state) => {
  const { article } = state;
  return {
    article: article.cur_article
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchArticle,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);