import { combineReducers } from 'redux';
import cur_article from './cur_article';
import articles from './articles'
const article = combineReducers({
  cur_article,
  articles
});
export default article;
