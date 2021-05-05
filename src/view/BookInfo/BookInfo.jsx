import React from 'react';
import ReactDOM from 'react-dom';
import { BOOK_COVER_URL } from '../../api/const';
import { TabContainer, TabItem } from "../../common_component/Tabs";
import Loadings from '../../common_component/Loadings';
import './style.scss';

class BookContents extends React.Component{
  constructor(props){
    super(props);
  }
  updateContent(contents) {
    if (contents) {
      let contentDOM = ReactDOM.findDOMNode(this.refs.content);
      $(contentDOM).html(contents);
    }
  }
  componentDidMount(){
    this.updateContent(this.props.contents);
  }
  componentWillReceiveProps(nextProps){
    this.updateContent(nextProps.contents);
  }
  render(){
    return (
      <div className="content" ref="content">
      </div>
    )
  }
}

export default class BookInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = { activeItem: 0 };
  }

  handleTabIndexChange(i){
    this.setState({ activeItem: i });
  }

  getContext(){
    switch (this.state.activeItem) {
      case 0:
        return (<BookContents contents={this.props.cur_book.toc}/>);
      case 1:
        return (<BookContents contents={this.props.cur_book.intro}/>);
    }
  }

  componentDidMount(){
    console.log('BookInfo did mount');
    const { actions, cur_book } = this.props;
    const bookID = this.props.match.params.id;
    if (bookID != cur_book.uri) {
      actions.fetchBookDetail(bookID);
    }
  }

  render(){
    console.log('BookInfo render');
    const { cur_book } = this.props;
    const bookID = this.props.match.params.id;
    if (bookID != cur_book.uri) {
      return (
        <Loadings show={true}/>
      );
    }
    let context = this.getContext();
    return(
      <div className="book-info">
        <Loadings show={cur_book.fetching_book_detail}/>
        <div className="book-head">
          <img className="book-cover" src={BOOK_COVER_URL+cur_book.uri+".jpg"}/>
          <div className="book-title">{cur_book.title}</div>
        </div>
        <TabContainer handleIndexChange={this.handleTabIndexChange.bind(this)}>
          <TabItem>目录</TabItem>
          <TabItem>简介</TabItem>
        </TabContainer>
        {context}
      </div>
    )
  }
}
