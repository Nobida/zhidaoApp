import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Filters from './Filters'
import Loadings from '../../common_component/Loadings';
import Button from "../../common_component/Button";
import IconButton from '../../common_component/IconButton';
import Empty from '../../common_component/Empty';
import Toast from '../../common_component/Toast';
import { NoteListItem } from "../../common_component/NoteList";
import { Drawer } from "../../common_component/Drawer";
import { note, question } from "../../svg";
import './style.scss';


export default class RoundTableContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: sessionStorage.getItem('roundTableFilter') || 'note',
      showDeleteDrawer: false,
      deleteType: '',
      deleteId: '',
      showToast: false,
      toastMsg: '',
      toastStatus: '',
    }
  }

  getRoundTableContentByFilter(filter_prop) {
    const { round_table_content } = this.props;
    const filter = filter_prop ? filter_prop : this.state.filter;
    switch (filter) {
      case 'note':
        return round_table_content.note;
      case 'question':
        return round_table_content.question;
      case 'post':
        return round_table_content.post;
      case 'media':
        return round_table_content.media;
      default:
        return null;
    }
  }

  handleFilterChanged(filter) {
    if (this.state.filter !== filter) {
      this.setState({ filter }, () => {
        const scrollTop = sessionStorage.getItem('round-table-scroll-' + filter);
        if (scrollTop || scrollTop === 0) {
          console.log('get scroll ' + scrollTop)
          const scroller = ReactDOM.findDOMNode(this.refs.roundTableScroller);
          $(scroller).scrollTo(scrollTop)
        }
      });
      sessionStorage.setItem('roundTableFilter', filter);
      const content = this.getRoundTableContentByFilter(filter);
      if (content && !content.fetching && !content.content.length) {
        const roundTableId = this.props.match.params.id;
        this.getRoundTableDataByFilter(roundTableId, filter)
      }
    }
  }

  getRoundTableDataByFilter(roundTableId, filter, nextUrl) {
    if (filter === 'note') {
      this.props.actions.fetchRoundTableNote(roundTableId, nextUrl);
    } else if (filter === 'question') {
      this.props.actions.fetchRoundTableQuestion(roundTableId, nextUrl);
    } else if (filter === 'post') {
      this.props.actions.fetchRoundTablePost(roundTableId, nextUrl);
    } else if (filter === 'media') {
      this.props.actions.fetchRoundTableMedia(roundTableId, nextUrl);
    } else {
      console.error('wrong filter')
    }
  }

  onDeleteClick(item, deleteType) {
    this.setState({
      deleteType,
      deleteId: item.uuid,
      showDeleteDrawer: true
    });
  }

  handleDelete() {
    const { deleteType, deleteId } = this.state;
    let resultOk = false;
    if (deleteType === 'note') {
      this.props.actions.deleteNote(deleteId);
      resultOk = true;
    } else if (deleteType === 'question') {
      this.props.actions.deleteQuestion(deleteId);
      resultOk = true;
    } else if (deleteType === 'post') {
      const roundTableId = this.props.match.params.id;
      this.props.actions.deletePost(deleteId, roundTableId);
      resultOk = true;
    } else {
      console.error('wrong deleteType');
    }
    if (resultOk) {
      this.setState({
        showToast   : true,
        toastMsg    : '正在删除..',
        toastStatus : 'loading'
      });
    } else {
      this.setState({
        showToast   : true,
        toastMsg    : '删除失败',
        toastStatus : 'fail'
      });
    }
    this.hideDrawer();
  };

  hideDrawer() {
    this.setState({
      deleteType: '',
      deleteId: '',
      showDeleteDrawer: false
    });
  }

  toggleFavorClick(item, toggleType) {
    const { actions } = this.props;
    if (toggleType === 'note') {
      actions.toggleFavorOfNote(item.uuid, item.rated);
    } else if (toggleType === 'question') {
      actions.toggleFavorOfQuestion(item.uuid, item.rated);
    } else if (toggleType === 'post') {
      actions.toggleFavorOfPost(item.uuid, item.rated);
    } else {
      console.error('wrong toggleType')
    }
  }

  onQuoteClick(item) {
    console.log(item)
    const { lesson_page,can_access_lesson } = item;
    const { filter } = this.state;
    const { actions, history } = this.props;
    if (lesson_page) {
      const lesson_page_split = lesson_page.split('/');
      if(lesson_page_split.length>1 && lesson_page_split[1] && can_access_lesson){
        actions.setCurHighlight(item);
        const QUOTE_DRAWER = 4;
        history.push('/reading2/' + lesson_page + '/' + QUOTE_DRAWER);
        return;
      }
    }
    history.push('/'+filter+'/'+item.uuid);
  }

  getContentView() {
    const { filter } = this.state;
    const round_table_content = this.getRoundTableContentByFilter();
    if (!round_table_content) {
      return null;
    }
    // TODO 资源的展示
    return round_table_content.content.length ? (
      round_table_content.content.map(item => filter === 'media' ? (
        <div key={item.uri}>
          <div>{item.uri}</div>
          <div>{item.name}</div>
          <div>{item.desc}</div>
          <div>{item.public}</div>
          <div>{item.type}</div>
          <div>{item.format}</div>
          <div>{item.marker_list}</div>
        </div>
      ) : (
        <NoteListItem
          key={item.uuid}
          resource={filter}
          avatar={item.avatar}
          nickname={item.nickname}
          contents={item.contents}
          selection={item.selection}
          create_dt={item.create_dt}
          id={item.uuid}
          roundTable={filter == 'post' ? this.props.match.params.id : ''}
          own={item.user == this.props.user_id}
          onQuoteClick={this.onQuoteClick.bind(this,item)}
          onDeleteClick={this.onDeleteClick.bind(this,item,filter)}
          onRatingClick={this.toggleFavorClick.bind(this,item,filter)}
          rated={item.rated}
          rating={item.rating}
          showFavor={true}
          sticky={item.sticky}
          source={item.source}
          lesson_name={item.lesson_name}
          showComment= {filter === 'question'}
          comment_count = {filter === 'question'?item.answers_num:0}
        />
      ))
    ) : round_table_content.fetching ? null : <Empty />;
  }

  getLoadingView() {
    const round_table_content = this.getRoundTableContentByFilter();
    return (!round_table_content || round_table_content.next_url || round_table_content.fetching) ? (
      <Loadings ref='loadingView' inView={true} show={true} />
    ) : null;
  }

  getCreateView() {
    const roundTableId = this.props.match.params.id;
    switch (this.state.filter) {
      case 'note':
        return (
          <Link to={"/create-note/round-table/" + roundTableId}>
            <IconButton className="create-btn" icon={note}/>
          </Link>
        )
      case 'question':
        return (
          <Link to={"/create-question/round-table/" + roundTableId}>
            <IconButton className="create-btn" icon={question}/>
          </Link>
        )
      case 'post':
        return (
          <Link to={"/create-post/round-table/" + roundTableId}>
            <IconButton className="create-btn" icon={note}/>
          </Link>
        )
      default:
        return null;
    }
  }

  handleRoundTableContentListScroll(e) {
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const { filter } = this.state;
    sessionStorage.setItem('round-table-scroll-' + filter, scrollTop);

    const round_table_content = this.getRoundTableContentByFilter();
    if (!round_table_content || round_table_content.fetching || !round_table_content.next_url) {
      return;
    }
    const loadingView = ReactDOM.findDOMNode(this.refs.loadingView);
    const roundTableContentList = ReactDOM.findDOMNode(this.refs.roundTableContentList);
    const GAP = $(loadingView).height() + parseInt($(roundTableContentList).css('marginBottom'));
    if (clientHeight + scrollTop >= scrollHeight - GAP) {
      console.log("reach bottom");
      const roundTableId = this.props.match.params.id;
      this.getRoundTableDataByFilter(roundTableId, this.state.filter,
        round_table_content.next_url);
    }
  }

  componentDidMount() {
    console.log('RoundTableContent did mount')
    sessionStorage.setItem('round-table-scroll-note', 0);
    sessionStorage.setItem('round-table-scroll-question', 0);
    sessionStorage.setItem('round-table-scroll-media', 0);
    sessionStorage.setItem('round-table-scroll-post', 0);
    const roundTableId = this.props.match.params.id
    this.getRoundTableDataByFilter(roundTableId, this.state.filter)
  }

  componentWillReceiveProps(nextProps) {
    console.log('RoundTableContent will receive props');
    console.log(this.props);
    console.log(nextProps);
    if (nextProps.cur_delete.success_info && this.props.cur_delete.deleting) {
      this.setState({
        showToast   : true,
        toastMsg    : '删除成功',
        toastStatus : 'finish'
      });
    }
    if (nextProps.cur_delete.error_info && this.props.cur_delete.deleting) {
      this.setState({
        showToast   : true,
        toastMsg    : '删除失败',
        toastStatus : 'fail'
      });
    }
  }

  render() {
    console.log('RoundTableContent render')
    const contentView = this.getContentView();
    const loadingView = this.getLoadingView();
    const createView = this.getCreateView();
    return (
      <div className="round-table-content">
        <div className="round-table-filters-bg"></div>
        <Filters
          select={this.state.filter}
          onFilterChanged={this.handleFilterChanged.bind(this)}
        />
        <div
          className="content-wrapper"
          ref="roundTableScroller"
          onScroll={this.handleRoundTableContentListScroll.bind(this)}>
          <div className="content" ref="roundTableContentList">
            { contentView }
            { loadingView }
          </div>
        </div>
        { createView }
        <Drawer
          show={this.state.showDeleteDrawer}
          className="delete-container"
          pos="bottom"
          onRequestClose={this.hideDrawer.bind(this)}
          showClose>
          <div className="delete-content">
            <p>确定要删除吗</p>
            <div className="button-tools">
              <Button onClick={this.handleDelete.bind(this)}>确定</Button>
              <Button onClick={this.hideDrawer.bind(this)} type='ghost'>取消</Button>
            </div>
          </div>
        </Drawer>
        <Toast
          show={this.state.showToast}
          autoHide
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
      </div>
    );
  }
}
