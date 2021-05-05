/**
 * Reading Content
 */
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {ROOT_URL,DEFAULT_LESSON_BG} from "../../../api/const";
import Toast from '../../../common_component/Toast';
import Audio from '../../../common_component/Audio';
import {BookPage} from '../../../common_component/BookPage';
import {BookPageInteractive, InteractiveFooter} from "../../../common_component/BookPageInteractive/index";
import QA from '../QA';
import Quiz from '../Quiz';
import Button from '../../../common_component/Button';
import ImageViewer from '../../../common_component/ImageViewer';
import { SwiperContainer, SwiperItem } from "../../../common_component/Swiper";
import { check_2, question_mark, title_qa,lock,information,check,props,timeline,gis,knowledgegraph } from "../../../svg";
import Loadings from '../../../common_component/Loadings';
import ShareLead from '../../../common_component/ShareLead';
import { setPunchPage,setProbationSharePage } from '../../../utils/punchHelper';
import PageCardHeader from './PageCardHeader';
import Icon from '../../../common_component/Icon';
import IconButton from '../../../common_component/IconButton'
import {down,right,refresh} from "../../../svg/index";
import './style.scss';
import {saveLessonProgress,getLessonProgress} from "../../../api/lesson";
import { GRAPH_MAIN_URL } from "../../../api/const"
import HeadCap from '../HeadCap'
import {checkProbationPath} from "../../../utils/path_helper";
import { CSSTransition } from 'react-transition-group'




export default class ReadingContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showToast   : false,
      toastStatus : '',
      toastMsg    : '',
      showShareLead: false,
      showImageViewer: false,
      imageViewerSrc : '',
      interactiveLoaded: false,
      couldShow:    false,
    }
  }

  //根据id获取page的下标
  getPageIndex(pageName) {
    const {lesson_info} = this.props;
    const part_info = lesson_info.part_info;
    if(part_info) {
      for (let i = 0; i < part_info.length; i++) {
        if(part_info[i].id == pageName){
          return i + 1
        }
      }
      if(pageName=='HEAD'){
        return 0;
      }
      if(pageName=='punch'){
        return part_info.length + 1
      }
    }

    return 0;
  }

  //根据下标获取page的id
  getPageName(index) {
    const {lesson_info} = this.props;
    const part_info = lesson_info.part_info;
    if(part_info && index>0 && index<=part_info.length) {
      return part_info[index-1].id;
    }
    else if(index==part_info.length+1){
      return 'punch'
    }
    if(index==0){
      return 'HEAD'
    }
    else if(part_info){
      return part_info[0].id;
    }
  }


  //设置图片显示
  setShowImageViewer(){
     const o = this;
     $('body').on('click',function(e){
       let targetContainer = $(e.target).parent();
       if(targetContainer.hasClass('picbox')){
         o.setState({showImageViewer: true, imageViewerSrc: $(e.target).attr('src')})
       }
     })

  }
  //隐藏图片显示
  hideImageViewer(){
    this.setState({showImageViewer: false})
  }


  //滑动响应事件
  handleSlideChange(index){
    const { history,location } = this.props;
    const lesson_id = this.props.match.params.id;
    const course_id = this.props.match.params.course_id;
    const page_name = this.getPageName(index);
    const parent_path = location.pathname.split("/")[1];
    //更新路由
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+course_id+'/'+lesson_id+'/'+page_name);
    }
  }

  //交互按钮刷新事件
  handleInteractiveRefreshClick(){
    const part_info = this.props.lesson_info.part_info;
    const {lesson_progress,actions} = this.props;
    const page_name = this.props.match.params.page_name
    const index = this.getPageIndex(page_name);
    //当前卡片信息
    const cur_part_info = part_info && part_info[index-1]
    lesson_progress[cur_part_info.id] = 0
    saveLessonProgress(this.props.lesson_info.id,lesson_progress);
    actions.setCurLessonProgress(lesson_progress);
  }

  //交互按钮点击事件
  handleInteractiveNextClick(){
    const part_info = this.props.lesson_info.part_info;
    const {lesson_progress,actions} = this.props;
    const page_name = this.props.match.params.page_name
    const index = this.getPageIndex(page_name);
    //当前卡片信息
    const cur_part_info = part_info && part_info[index-1]
    if(lesson_progress[cur_part_info.id])
      lesson_progress[cur_part_info.id] += 1
    else{
      lesson_progress[cur_part_info.id] = 1
    }
    actions.setCurLessonProgress(lesson_progress);
    saveLessonProgress(this.props.lesson_info.id,lesson_progress);
  }

  handleSelection(selection){
    const { actions } = this.props;
    actions.setCurSelection(selection);
  }
  showShareLead(){
    const { actions,location } = this.props;
    this.setState({showShareLead: true});
    const isProbation = checkProbationPath(location)
    if(!isProbation){
      setPunchPage(actions.setSharePage, actions.createSharePage);
    }
  }

  hideShareLead(){
    this.setState({showShareLead: false})
  }

  handleToggole() {
    this.setState({
      couldShow: this.state.couldShow ? false : true
    })
  }

  handleCreateUnicomPage(part_info) {
    null

  }


  componentWillReceiveProps(nextProps){
     const {actions,match} = nextProps;
     const lesson_id = match.params.id;
     const course_id = match.params.course_id;
     const cur_submit_quiz = nextProps.cur_submit_quiz;
     const pre_submit_quiz = this.props.cur_submit_quiz;

  
     if(!cur_submit_quiz.submitting_quiz && pre_submit_quiz.submitting_quiz){
       actions.fetchLessonQuizStatus(lesson_id,course_id);
     }
     if (cur_submit_quiz.submitting_quiz) {
      this.setState({
        showToast   : true,
        toastStatus : 'loading',
        toastMsg    : '正在提交',
      });
    } else if (cur_submit_quiz.error_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'fail',
        toastMsg    : '提交失败',
      });
    } else if (pre_submit_quiz.submitting_quiz && cur_submit_quiz.success_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'success',
        toastMsg    : '提交成功',
      });
      actions.fetchUserStat();
    }

  }

  componentDidUpdate(prevProps, prevState) {
    // 如果数据发生变化，则折叠工具栏
    if(prevProps.location !== this.props.location){
      this.setState({
        couldShow: false
      })
    }
  }


  componentDidMount() {

    const { lesson_progress,actions,match,lesson_info,lesson_page,highlight,location } = this.props;
    const lesson_id = match.params.id;
    const course_id = match.params.course_id;
    const part_info = lesson_info.part_info



    
    const isProbation = checkProbationPath(location)
    //获取lesson的答题状态和用户信息
    if(!isProbation){
      actions.fetchLessonQuizStatus(lesson_id,course_id);
      
    }else{
      const {quizes} = lesson_info
      let quiz_status = {status:'finished',quiz_results:[]}
      if(quizes && quizes.length){
        for(let quiz in quizes){
          quiz_status.quiz_results.push({
            id: quiz.id,
            order: quiz.order,
            answer: quiz.right_answer,
            correct: true
          })
        }
      }
      setProbationSharePage(actions.setSharePage,actions.createSharePage)
      actions.setLessonQuizStatus(quiz_status) 
    }
    actions.fetchUserStat();
    //setPunchPage(actions.setSharePage, actions.createSharePage);

    //加载进度信息
    const saved_lesson_progress = getLessonProgress(lesson_id);
    if(saved_lesson_progress){
      actions.setCurLessonProgress(saved_lesson_progress)
    }

    //设置图片点击浏览
    this.setShowImageViewer();

    




    //根据part info获取lessonpage
    if(part_info){
      for(let i=0;i<part_info.length;i++){
        if(!lesson_page[part_info[i].id] || lesson_page[part_info[i].id].lesson !=lesson_id){
          actions.fetchLessonPage(lesson_id,course_id,part_info[i].id);
        }
        let container = ReactDOM.findDOMNode(this.refs[part_info[i].id]);
        //加载历史纪录
        if(lesson_progress[part_info[i].id] && container) {
          if(!highlight.selection || !highlight.selection.contents) {
            $(container).scrollTo(lesson_progress[part_info[i].id]);
          }
        }
      }
    }
    // 获取思考题
    actions.fetchLessonThinkingQuestions(lesson_id);

  }

  //交互页面加载完成
  handleInteractiveLoading(){
      this.setState({interactiveLoaded:false})
  }

  //交互页面加载完成
  handleInteractiveLoaded(){
      this.setState({interactiveLoaded:true})
  }

  handleAudioSrcChange(id,second,duration){
    const {lesson_audio_progress,actions} = this.props;
    if(second!=duration){
      lesson_audio_progress[id] = second;
    }else{
      lesson_audio_progress[id] = 0;
    }
    actions.setCurLessonAudioProgress(lesson_audio_progress);
  }

  //卡片滑动到上一张
  switchLeft(){
    const { history,location } = this.props;
    const index = this.getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    const course_id = this.props.match.params.course_id;
    if(index==0){
      return;
    }
    const page_name = this.getPageName(index-1);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+course_id+'/'+lesson_id+'/'+page_name);
    }
  }
  //卡片滑动到下一张
  switchRight(){
    const { history,location } = this.props;
    const index = this.getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    const course_id = this.props.match.params.course_id;
    const page_name = this.getPageName(index+1);
    console.log('pathname');
    console.log(page_name);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name){
      history.replace("/"+parent_path+'/'+course_id+'/'+lesson_id+'/'+page_name);
    }
    console.log('switch right')
  }


  componentWillUnmount() {
    console.log('ReadingContent will unmount');
    const { actions,lesson_info,lesson_progress } = this.props;

    const part_info = lesson_info.part_info;
    if(part_info){
      for(let i=0;i<part_info.length;i++){
        if(!part_info[i].interactive) {
          let container = ReactDOM.findDOMNode(this.refs[part_info[i].id]);
          let p = $(container).scrollTop();
          lesson_progress[part_info[i].id] = p;
        }
      }
      //更新历史记录
      actions.setCurLessonProgress(lesson_progress);
      saveLessonProgress(lesson_info.id,lesson_progress);
    }
    actions.setDefaultSharePage();

  }


  //检查quiz卡片的答题状态，做完返回1，没做完返回0
  checkQuizCardStatus(quiz){
    const isPreviewer = (this.props.lesson_info.status == 'not_come');
    if (isPreviewer) {
      return true;
    }
    const {lesson_quiz_status} = this.props;
    const quizes = quiz.quizes;
    const {quiz_results,status} = lesson_quiz_status;
    if(status=='finished')
      return true;
    if(!quiz_results || !quizes || status=='not_punched')
      return false;
    const answered_quizes = quiz_results.map(function(d){return d.order});
    for(let i=0;i<quizes.length;i++){
      if(answered_quizes.indexOf(quizes[i])==-1)
        return false;
    }
    return true;
  }

  //检查是否有上一首
  checkAudioHasPrev(){
    const index = this.getPageIndex(this.props.match.params.page_name);
    const part_info = this.props.lesson_info.part_info;
    if(!part_info || index==0){
      return false
    }
    const audioMedias = part_info[index-1] && part_info[index-1].medias && part_info[index-1].medias.length && part_info[index-1].medias.filter(function(d){return d.type=='audio'})
    //如果上一个卡片还有资源返回true
    return audioMedias && audioMedias.length
  }
  //检查是否有下一首
  checkAudioHasNext(){
    const index = this.getPageIndex(this.props.match.params.page_name);
    const part_info = this.props.lesson_info.part_info;
    if(!part_info || index>=part_info.length-1){
      return false
    }
    const audioMedias = part_info[index+1] && part_info[index+1].medias && part_info[index+1].medias.length && part_info[index+1].medias.filter(function(d){return d.type=='audio'})
    //如果接下来的卡片还有资源返回true
    return audioMedias && audioMedias.length
  }


  render(){

    console.log("ifUnicom")
    const urlList = this.props.match.url.split("/")
    const ifUnicom = (urlList[1]==='reading-probation-unicom')?true:false
    console.log(ifUnicom)
    console.log(this.state.showImageViewer)

    const fontSize = this.props.reading_settings.font_size;
    const cHeight = document.body.offsetHeight - 60;
    const {agent_type,lesson_info,lesson_quiz_status,apikey,lesson_audio_progress,location} = this.props;
    const activeSlide = this.getPageIndex(this.props.match.params.page_name);

    //在PC上禁止滑动（为了可以选中文字）
    const slideClassName = agent_type=='PC'?'book-page-slide-container swiper-no-swiping':'book-page-slide-container'
    const part_info_basic = this.props.lesson_info.part_info;
    const part_info = ifUnicom?part_info_basic.filter(function(d){return d.id!=='PREVIEW'&&d.id!=='REVIEW'}):part_info_basic


    const course_id = this.props.match.params.course_id;
    const lesson_page = this.props.lesson_page;
    const lesson_progress = this.props.lesson_progress;
    const index = this.getPageIndex(this.props.match.params.page_name);
    //当前卡片信息
    const cur_part_info = index>0?part_info && part_info[index-1]:null;
    const cur_part_id = cur_part_info?cur_part_info.id:'';
    const cur_part_audio_progress = lesson_audio_progress[cur_part_id]?lesson_audio_progress[cur_part_id]:0;
    //当前卡片的音频信息

    const curAudioMedias = cur_part_info && cur_part_info.medias && cur_part_info.medias.length && cur_part_info.medias.filter(function(d){return d.type=='audio'})

    //是否是试读状态
    const isProbation = checkProbationPath(location)
    //音频是否可切换
    const curAudioHasNext = this.checkAudioHasNext();
    const curAudioHasPrev = this.checkAudioHasPrev();
    const o = this;

    //available 变量为了根据答题状况控制卡片是否展示内容
    let available = true;
    let swipers = [];
    //是否是预览状态
    const isPreviewer = (lesson_info.status == 'not_come');

    console.log('lesson content props')
    console.log(this.props);

    console.log('activeItem')
    console.log(activeSlide)





    const paramsList = this.props.location.pathname.split("/")
    const lastParam = paramsList[paramsList.length-1]



    const toolList = lesson_info.knowledge_graph_id.map(function(d,i){
      return(
          <a href={GRAPH_MAIN_URL}>
            <span className={"icon-"+i}>
              {d.substring(0,2)=="TL"?timeline:(
                d.substring(0,2)=="RL"?knowledgegraph:gis)}
            </span>
          </a>)
    })


    swipers.push((
      <SwiperItem
          key={0}
          className={slideClassName}
          ref='headCap'
          style={{height:cHeight}}>
          <HeadCap
            id={lesson_info.id}
            course_id={course_id}
            date={lesson_info.date}
            name={lesson_info.name}
            desc={lesson_info.desc}
            picture={lesson_info.picture?ROOT_URL+lesson_info.picture:DEFAULT_LESSON_BG}
            day_num={lesson_info.day_num}
            onButtonClick={o.switchRight.bind(o)}
            isProbation={isProbation}
            ifUnicom={ifUnicom}
          />
      </SwiperItem>
      ))

    //题图信息

    if(part_info && lesson_quiz_status){
      for(let i=0;i<part_info.length;i++){
        let pageName = part_info[i].id;
        let page_content;
        let button_content;
        let button_content_unicom;
        let reading_tool;
        let advertisements;
        if(lesson_page.fetching_lesson_page[pageName]){
          page_content = (
            <Loadings show={true}/>
          )
        }
        else if(available) {
          if (part_info[i].interactive){
            page_content = (
              <BookPageInteractive
                  fontSize={fontSize}
                  onNoteItemClick={o.props.onNoteItemClick}
                  highlight={o.props.highlight}
                  selection={o.props.selection}
                  onFootMarkClick={o.props.onFootMarkClick}
                  content={lesson_page[pageName]}
                  apikey={o.props.apikey}
                  highlights={o.props.notes_user}
                  handleSelection={o.handleSelection.bind(o)}
                  page_type={pageName}
                  progress={lesson_progress[part_info[i].id]?lesson_progress[part_info[i].id]:0}
                  onPageChange={o.switchRight.bind(o)}
                  onLoaded={o.handleInteractiveLoaded.bind(o)}
                  onLoading={o.handleInteractiveLoading.bind(o)}
                />
            )
          }
          else if (part_info[i].type == 'text') {

            page_content = (
              <BookPage
                  fontSize={fontSize}
                  onNoteItemClick={o.props.onNoteItemClick}
                  highlight={o.props.highlight}
                  selection={o.props.selection}
                  onFootMarkClick={o.props.onFootMarkClick}
                  content={lesson_page[pageName]}
                  apikey={o.props.apikey}
                  highlights={o.props.notes_user}
                  handleSelection={o.handleSelection.bind(o)}
                  page_type={pageName}
                />
            )

            button_content = (
              <Button className='next-btn' onClick={this.switchRight.bind(this)}>{i<(part_info.length-1)?('点此进入下一部分'):'读完打卡'}</Button>
            )

            button_content_unicom = (
              <div className='unicom-button' onClick={this.switchRight.bind(this)}>{i<(part_info.length-1)?('点此进入下一部分  >>'):''}</div>
            )

            reading_tool = (
              <CSSTransition
                 in={ this.state.couldShow }
                 timeout={ 300 }
                 classNames='fade'>   
                  <div className='settings'>
                    <div className="more" onClick={this.handleToggole.bind(this)}>{ props }</div>
                    <span className={this.state.couldShow ? 'icon-triangle':'icon-triangle-anim'} ></span>
                    <span className={this.state.couldShow ? ('icon-containers-'+toolList.length):'icon-containers-anim'}>
                      <div className={"icon-list"}>{toolList}</div>
                    </span>
                  </div>
              </CSSTransition>
            )

            advertisements = (

              <div className='advertisements'>
                <img src="img/adGis.png"/>
                <img src="img/adRel.png"/>
                <img src="img/adTl.png"/>
              </div>
            )
          }



          else if (part_info[i].type == 'quiz' && lesson_page[pageName]) {
            if(available && !this.checkQuizCardStatus(part_info[i])){
              available = false;
            }
            let quizes = lesson_page[pageName].quizes
            if(isProbation){
              for(let i=0;i<quizes.length;i++){
                let quiz = quizes[i]
                quiz = Object.assign(quiz,{ 
                  answered: true,
                  answer: quiz.right_answer,
                  correct: true
                })
                quizes[i] = quiz  
              }
            } 
            
            page_content = (
              <Quiz
                lesson = {lesson_page[pageName].lesson}
                quizes = {lesson_page[pageName].quizes}
                isPreviewer = {isPreviewer}
              />
            );
            button_content = this.checkQuizCardStatus(part_info[i]) && !part_info[i].interactive?(
              <Button className='next-btn' onClick={this.switchRight.bind(this)}>{i<(part_info.length-1)?('点此进入下一部分'):'读完打卡'}</Button>
            ):null;

            button_content_unicom = this.checkQuizCardStatus(part_info[i]) && !part_info[i].interactive?(
              <div className='unicom-button' onClick={this.switchRight.bind(this)}>{i<(part_info.length-1)?('点此进入下一部分  >>'):'读完打卡'}</div>
            ):null;
          }
        }else{
          page_content = (
            <div className="lock-content">
              {lock}
              <p>答题后查看<b>{part_info[i].name}</b></p>
            </div>
          )
        }
        swipers.push(
          <SwiperItem
          key={i + 1}
          className={slideClassName}
          ref={pageName}
          style={{height:cHeight}}>
            <div className='page-content'>
              <PageCardHeader
                cardName={part_info[i].name}
                lessonName={lesson_info.name}
                dayNum={lesson_info.day_num}
                cardCount={part_info.length}
                curCardNum={i+1}
                cardBanner={part_info[i].banner?part_info[i].banner:''}
                ifUnicom={ifUnicom}
              />
              {page_content}
              {ifUnicom ? button_content_unicom : button_content}

              
              <div className="content-pad"></div>

            </div>
          </SwiperItem>
        )
      }
      const { thinking_questions } = this.props;
      let questionsView = null;
      if (!thinking_questions.fetching_questions && thinking_questions.questions && thinking_questions.questions.length > 0) {
        questionsView = (
          <div className="question-button">     
            <Link to={'/question/' + thinking_questions.questions[0].uuid}>
              <Button>巩固知识，进入思考题 >></Button>
            </Link>
          </div>
        );
      }
      swipers.push(
        <SwiperItem
          key={part_info.length + 1}
          className={slideClassName}
          ref='punch'
          style={{height:cHeight}}>
          {ifUnicom?(

            <div className='check-square-unicom'>
            <div className="lead-img">
              <div className="qr-above-part">
                <div className="qr-title">
                  <img src='img/unicomTitle.png'/>
                </div>
              </div>
              <div className='qr-code'>
                <img src={'img/qr.png'}/>
              </div>

              <div className="qr-below-part">
                <div className='qr-triangle'></div>
              长按或扫描二维码获取更多课程</div>
            </div>
            </div>


            ):
            lesson_quiz_status.status=='finished'||lesson_quiz_status.status=='no_quizes'?(
              <div>
                <div className='check-square'>
                  <div className="check-content">
                    <div className="info-icon check">
                      {check_2}
                    </div>
                    <div className='status'>恭喜您，打卡成功！</div>
                    <br/>
                    <div className='share-link'>
                      <Button onClick={this.showShareLead.bind(this)}>分享朋友圈</Button>
                    </div>  
                    <br/>
                    <div className='invite-friends'>
                      <Link to={'/invitation/'+course_id}>
                      <Button>邀请好友赢积分</Button>
                      </Link>
                    </div>
                    <Link to='/score-rule'><div className="score-rule-link">
                      <span>积分规则</span>
                      <span className='question-mark'>{ question_mark }</span></div></Link>
                  </div>
                </div>
                {questionsView}
              </div>
            ):(
              <div className='check-square'>
                <div className="check-content">
                  <div className="info-icon info">
                    {information}
                  </div>
                  <div>今日打卡未完成</div>
                  <br/>
                  <Link to='/score-rule'><div className="score-rule-link">
                      <span>积分规则</span>
                      <span className='question-mark'>{ question_mark }</span></div>

                  </Link>
                </div>
              </div>
            )
          }

        </SwiperItem>
      )
    }
    if (part_info && part_info.length && lesson_quiz_status) {
    return (
      <div>
        {agent_type=='PC'?(<div className="header">
          <div className="left" onClick={this.switchLeft.bind(this)}>上一部分</div>
          <div className="right" onClick={this.switchRight.bind(this)}>下一部分</div>
        </div>):null}

      {(lesson_quiz_status.status==='finished'||lesson_quiz_status.status==='no_quizes') && this.props.match.params.page_name==='punch' ?(
        <SwiperContainer
          className="reading-content-punch"
          activeSlide={activeSlide}
          onSlideChange={this.handleSlideChange.bind(this)}
          >
          {swipers}
        </SwiperContainer>):(
        <SwiperContainer
          className="reading-content"
          activeSlide={activeSlide}
          onSlideChange={this.handleSlideChange.bind(this)}>
          {swipers}
        </SwiperContainer>)}
        {(cur_part_info && cur_part_info.interactive)?(
          <InteractiveFooter onNext={this.handleInteractiveNextClick.bind(this)}
                             loaded={this.state.interactiveLoaded}
                             onMoreClick={this.props.onMoreClick}
                             more_tool_active={this.props.more_tool_active}
                             onRefresh={this.handleInteractiveRefreshClick.bind(this)}/>
        ):null}

      { (curAudioMedias && curAudioMedias.length)?(
        <Audio
          id={cur_part_id}
          start_second={cur_part_audio_progress}
          title={cur_part_info && cur_part_info.name}
          onPrevClick={this.switchLeft.bind(this)}
          onNextClick={this.switchRight.bind(this)}
          onTimeFinish={this.switchRight.bind(this)}
          has_prev={curAudioHasPrev}
          has_next={curAudioHasNext}
          onSrcChange={this.handleAudioSrcChange.bind(this)}
          src={ROOT_URL+curAudioMedias[0].src+'?apikey='+apikey}
        />):null
      }
      {this.state.showImageViewer ? <ImageViewer src={this.state.imageViewerSrc} onRequestClose={this.hideImageViewer.bind(this)}/>:null}
      <Toast
          show={this.state.showToast}
          autoHide
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
        <ShareLead show={this.state.showShareLead} onRequestClose={this.hideShareLead.bind(this)}/>
      </div>
    );}else{
      return (
        <Loadings show={true}/>
      )
    }
  }
};