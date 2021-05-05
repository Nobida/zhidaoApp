import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import {Link} from 'react-router-dom';
import {ROOT_URL,DEFAULT_ARTICLE_BG} from "../../api/const";
import Card from '../../common_component/Card';
import {BookPage} from "../../common_component/BookPage/index";
import './style.scss';



export default class Article extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.fetchArticle();
  }

  fetchArticle(){
    const article_id = this.props.match.params.article_id?this.props.match.params.article_id:this.props.article_id;
    const {actions} = this.props;
    if(article_id) {
      actions.fetchArticle(article_id);
    }
  }

  render(){
    const {article,fetching_article} = this.props.article;
    return (

        !fetching_article? (
          <div className={!this.props.hideTitle?'article':''}>
            {!this.props.hideTitle?(<Card bg={article.picture?ROOT_URL+article.picture:DEFAULT_ARTICLE_BG}>{article.title}</Card>
            ):null}
            <div className='content'>
              {article.contents && article.type=='txt'?
              <BookPage content={{html:article.contents}} noPadding/>:null}
            </div>
          </div>
            ):(<Loadings/>)
    )
  }
}
