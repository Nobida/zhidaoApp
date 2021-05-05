import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { TabItem, TabContainer } from "../../../common_component/Tabs";
import { NoteListItem } from "../../../common_component/NoteList";
import IconButton from '../../../common_component/IconButton';
import Loadings from '../../../common_component/Loadings';
import Empty from '../../../common_component/Empty';
import { question } from "../../../svg";
import './style.scss';



export default class QuestionList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curTab: 0,
      doInitScroll: true,
    }
  }

  getQuestionsByTab(tab) {
    const { questions_all, questions_user } = this.props;
    const questions_now = (tab == 0) ? questions_all : questions_user;
    return questions_now;
  }

  scrollToProgress() {
    const { lesson_question_progress } = this.props;
    const progress = (this.state.curTab == 0) ?
                      lesson_question_progress['common'] :
                      lesson_question_progress['mine'];
    const questionList = ReactDOM.findDOMNode(this.refs.questionList);
    if (progress != $(questionList).scrollTop()) {
      $(questionList).scrollTo(progress);
    }
  }

  saveProgress() {
    const { actions } = this.props;
    const questionList = ReactDOM.findDOMNode(this.refs.questionList);
    const progress = $(questionList).scrollTop();

    if (this.state.curTab == 0) {
      actions.setCurLessonQuestionProgress({ common: progress });
    } else if (this.state.curTab == 1) {
      actions.setCurLessonQuestionProgress({ mine: progress });
    }
  }

  onQuoteClick(item) {
    if(this.props.onQuoteClick) {
      this.props.onQuoteClick(item);
    }
  }

  onDeleteClick(item) {
    if(this.props.onDeleteClick) {
      this.props.onDeleteClick(item);
    }
  }

  toggleFavorClick(item) {
    const {actions} = this.props;
    actions.toggleFavorOfQuestion(item.uuid,item.rated);
  }

  handleTabIndexChange(i) {
    this.saveProgress();
    const { actions, lesson_id, user_id } = this.props;
    const questions = this.getQuestionsByTab(i);
    if (questions.questions.length) {
      this.setState({ curTab: i }, () => {
        this.scrollToProgress();
      });
    } else {
      if (i == 0 && questions.next_page) {
        actions.fetchLessonQuestions(lesson_id, 1);
        actions.setCurLessonQuestionProgress({ common: 0 });
      } else if (i == 1 && questions.next_page) {
        actions.fetchLessonUserQuestions(lesson_id, 1, user_id);
        actions.setCurLessonQuestionProgress({ mine: 0 });
      }
      this.setState({ curTab: i });
    }
  }

  handleQuestionListScroll(e) {
    const { actions, lesson_id, user_id } = this.props;
    const questions_now = this.getQuestionsByTab(this.state.curTab);
    if (questions_now.fetching_questions || !questions_now.next_page) {
      return;
    }
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const loadingView = ReactDOM.findDOMNode(this.refs.loadingView);
    const questionList = ReactDOM.findDOMNode(this.refs.questionList);
    const GAP = $(loadingView).height() + parseInt($(questionList).css('marginBottom'));
    if (clientHeight + scrollTop >= scrollHeight - GAP) {
      console.log("reach bottom");
      if (lesson_id && this.state.curTab == 0) {
        actions.fetchLessonQuestions(lesson_id, questions_now.next_page);
      } else if (lesson_id && this.state.curTab == 1) {
        actions.fetchLessonUserQuestions(lesson_id, questions_now.next_page, user_id);
      }
    }
  }

  componentWillMount() {
    console.log('QuestionList will mount');
    const { actions, cur_post } = this.props;
    console.log(cur_post)
    if (cur_post.success_info) {
      actions.setCurLessonQuestionProgress({ common: 0 });
      this.setState({ doInitScroll: false });
    }
  }

  componentDidMount() {
    console.log('QuestionList did mount');
    const { actions, lesson_id, questions_all } = this.props;

    if (questions_all.questions.length && this.state.doInitScroll) {
      this.scrollToProgress();
    } else {
      actions.fetchLessonQuestions(lesson_id, 1);
      actions.setCurLessonQuestionProgress({ common: 0 });
    }
  }

  componentWillUnmount() {
    this.saveProgress();
  }

  render() {
    console.log('QuestionList render');
    const questions_now = this.getQuestionsByTab(this.state.curTab);
    const questionList = questions_now.questions.map(item => {
      let contents = item.contents;
      if (contents.length > 40) {
        contents = contents.substring(0, 40) + '...';
      }
      return (
        <NoteListItem
          resource="question"
          key={item.uuid}
          avatar={item.avatar}
          nickname={item.nickname}
          contents={contents}
          selection={item.selection}
          create_dt={item.create_dt}
          id={item.uuid}
          own={item.user == this.props.user_id}
          onQuoteClick={this.onQuoteClick.bind(this,item)}
          onDeleteClick={this.onDeleteClick.bind(this,item)}
          onRatingClick={this.toggleFavorClick.bind(this,item)}
          rated={item.rated}
          rating={item.rating}
          showFavor={true}
          counts={item.answers_num}
          showCount={true}
          showVip={item.answered_by_vip}
        />
      );
    });
    const loadingView = (questions_now.next_page || questions_now.fetching_questions) ? (<Loadings ref='loadingView' inView={true} show={true} />) : null;
    return(
      <div className="question-list-drawer">
        <TabContainer className="tabs-fixed-top" handleIndexChange={this.handleTabIndexChange.bind(this)}>
          <TabItem>全部问题</TabItem>
          <TabItem>我的问题</TabItem>
        </TabContainer>
        <div className="question-list-container" ref='questionListContainer' onScroll={this.handleQuestionListScroll.bind(this)}>
          <div className="question-list" ref='questionList'>
            { questionList.length ? questionList :
              questions_now.fetching_questions ? null : (<Empty/>) }
            { loadingView }
          </div>
        </div>
        <Link to="/create-question">
          <IconButton className="create-question-btn" icon={question}/>
        </Link>
      </div>
    );
  }
}
