import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchArticles } from "../../actions/article";
import ArticleList from './ArticleList';

const mapStateToProps = (state) => {
  const { articles } = state;
  return {
    articles
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchArticles,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleList)
);