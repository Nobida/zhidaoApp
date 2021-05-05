import React from 'react';
import { Link } from 'react-router-dom';
import { getBookIndex } from "../../utils/lesson_helper";
import { ROOT_URL } from "../../api/const";
import Loadings from '../../common_component/Loadings';
import Empty from '../../common_component/Empty';
import './style.scss';

class BookNoteItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to={'/book-note-list/'+this.props.id}>
        <div className="book-note-item">
          <div className="left">
            <div className="book-item">
              <div className="book-cover">
                <img src={ROOT_URL+'/pic/book_cover/'+this.props.id+'.small.jpg'}/>
              </div>
            </div>
            <div className="book-item-info">
              <div className="book-title">{this.props.title}</div>
              <div className="book-author">{this.props.authors}</div>
            </div>
          </div>
          <div className="note-count-info">
            <div className="count">{this.props.noteCount}</div>
            <div className="label">笔记</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default class UserBookNotes extends React.Component {
  constructor(props) {
    super(props);
  }

  getBookNotesInfo(){
    const { user_stat, booksData } = this.props;
    if (user_stat.notes_stat && user_stat.notes_stat.by_book && booksData && booksData.length) {
      let bookNotesInfo = [];
      for (let bookId in user_stat.notes_stat.by_book) {
        let bookIndex = getBookIndex(booksData, bookId);
        let bookInfo = booksData[bookIndex];
        if (bookInfo) {
          bookNotesInfo.push({
            title     : bookInfo.title,
            authors   : bookInfo.authors,
            noteCount : user_stat.notes_stat.by_book[bookId],
            id        : bookId,
          })
        }
      }
      return bookNotesInfo;
    } else {
      return [];
    }
  }

  getBookNoteItems(){
    const bookNotesInfo = this.getBookNotesInfo();
    return bookNotesInfo.map(item =>
      <BookNoteItem
        key={item.id}
        title={item.title}
        authors={item.authors}
        noteCount={item.noteCount}
        id={item.id}
      />
    );
  }

  componentDidMount(){
    console.log('UserBookNotes did mount');
    const { actions, booksData } = this.props;
    actions.fetchUserStat();
    if (!booksData || !booksData.length) {
      actions.fetchBooks();
    }
  }

  render(){
    console.log('UserBookNotes render');
    const bookNoteItems = this.getBookNoteItems();
    const { fetching_books, fetching_user_stat } = this.props;
    const isLoading = fetching_books || fetching_user_stat;
    return (
      <div className="user-book-notes">
        { bookNoteItems.length ? bookNoteItems : <Empty/> }
        <Loadings show={isLoading}/>
      </div>
    )
  }
}
