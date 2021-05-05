import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import {Link} from 'react-router-dom';
import './style.scss';

class ArticleListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {type,link,id} = this.props;
    return(
      <a href={type=='link'&&link?link:type=='txt'?'#/article/'+id:'#/main/home'}>
        <div className="article-list-item">
          {this.props.picture?(
            <div className="head-img" >
              <img src={this.props.picture}/>
            </div>):null}
          <div className="content">
             <div className="title">
                {this.props.title}
              </div>
              <div className="author">
                {this.props.author}
                </div>
              <div className="desc">
                {this.props.desc}
              </div>
          </div>
        </div>
      </a>
    )
  }
}

export default class ArticleList extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.fetchArticle();
  }
  fetchArticle(){
    const {actions,articles} = this.props;
    const {next_url} = articles;
    actions.fetchArticles(next_url);
  }
  render(){
    const {articles,fetching_articles} = this.props.articles;
    let articleList = articles.map(function(d,i){
      return (
          <ArticleListItem
            id={d.id}
            title={d.title}
            subtitle={d.subtitle}
            desc={d.desc}
            put_dt={d.pub_dt}
            type={d.type}
            author={d.author}
            key={d.id}
            picture={d.picture}
            link={d.link}
          />
      )
    });
    return (
      <div className="article-list">
        {fetching_articles?(<Loadings show/>):articleList}
      </div>
    )
  }
}
