import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Icon from '../../../common_component/Icon';
import { information } from '../../../svg';
import { fetchLessonBuddy } from "../../../actions/lesson";
import { fetchBooks } from "../../../actions/book";
import { getBookIndex } from "../../../utils/lesson_helper";
import './style.scss';

const changePageName = (nameStr)=>{
  switch (nameStr){
    case 'background':
      return 'BG';
    case 'text':
      return 'Text';
    case 'notes':
      return 'Notes';
    case 'q_and_a':
      return 'QA';
    default:
      return null;
  }
};


class TOCItem extends React.Component {
  constructor(props) {
    super(props);
  }

  getPageTitle(nameStr){
    switch (nameStr){
      case 'background':
        return '背景';
      case 'text':
        return this.props.name;
      case 'notes':
        return '讲义';
      case 'q_and_a':
        return '答疑汇总';
      default:
        return null;
    }
  }

  handleItemClick(id, page_name) {
    if (this.props.onClick) {
      this.props.onClick(id, page_name);
    }
  }

  getContentsItemClassName(page_name) {
    const { active, lesson_page } = this.props;
    let className = 'day-contents-item';
    if (active && lesson_page == page_name) {
      className += ' active';
    }
    return className;
  }

  render() {
    const id = this.props.id;
    const o = this;
    const contentItems = this.props.part_list&&this.props.part_list.length?this.props.part_list.map(function(d,i){
        let pageName = changePageName(d);
        let pageTitle = o.getPageTitle(d);
        if(pageName)
        return (
          <div className={o.getContentsItemClassName(pageName)}
               key={i}
            onClick={o.handleItemClick.bind(o, id, pageName)}>
            {pageTitle}
          </div>
        );
        else{
          return null
        }
    }):null;
    return (
      <div id={this.props.id} className={this.props.active ? "contents-item active" : "contents-item"}>
        <div className="day">{'DAY ' + (this.props.dayNum)}</div>
        <div className="day-contents">
          {contentItems}
        </div>
      </div>
    );
  }
}

class TOC extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemClick(id, page_name) {
    this.props.onClickTOCItem(id, page_name);
  }

  componentDidMount() {
    const { actions, lesson_info, books } = this.props;
    if (lesson_info) {
      actions.fetchLessonBuddy(lesson_info.id);
    }
    if (!books.books.length) {
      actions.fetchBooks();
    }
  }
  componentDidUpdate(){
    const { lesson_info} = this.props;
    const contents = ReactDOM.findDOMNode(this.refs.contents);
    $(contents).parent().scrollTo($('#'+lesson_info.id));
  }
  render() {
    const { lesson_info, lesson_buddy, books } = this.props;
    let tocItems = [];
    let book;
    let bookName = '';
    if (lesson_info && lesson_info.books) {
      book = lesson_info.books[0];
      const bookIndex = getBookIndex(books.books, book);
      bookName = (bookIndex != -1) ? books.books[bookIndex].title : '';
      if (lesson_buddy) {
        const lesson_page = this.props.match.params.page_name;
        let o = this;
        tocItems = lesson_buddy.map(item =>
          <TOCItem
            active={item.id == lesson_info.id}
            key={item.id}
            dayNum={item.day_num}
            onClick={o.handleItemClick.bind(o)}
            name={item.name}
            lesson_page={lesson_page}
            id={item.id}
            part_list={item.part_list}
          />
        );
      }
    }

    return (
      <div className="contents" ref="contents">
        <div className="title">目录</div>
        <Link to={book ? "/book-info/" + book : ''}>
          <div className="book-title">
            <div>{bookName}</div>
            <Icon size="sm" icon={information} />
          </div>
        </Link>
        {tocItems}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { cur_lesson, books } = state;
  return {
    lesson_buddy: cur_lesson.lesson_buddy.buddy,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    books
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLessonBuddy,
      fetchBooks,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TOC)
);