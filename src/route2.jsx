

import React from "react";
import { Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom';

import ApiKeyLoader from './containers/ApiKeyLoader';

import App from './view/App'
import MainContainer from './view/MainContainerProbation'
import Course from './view/Course2'
import CreateNote from './view/CreateNote'
import Retail from './view/Retail'

import Loadable from "react-loadable";

import Loadings from './common_component/Loadings'

function Loading(){
  return (<Loadings show/>)
}

const asyncComponent = (importComponent)=>{
  return Loadable(
    {
      loader: importComponent,
      loading: Loading
    }
  )
}

const AsyncUser = asyncComponent(()=>import('./view/User'))
const AsyncHome = asyncComponent(()=>import('./view/Home2'))
const AsyncSquare = asyncComponent(()=>import('./view/Square'))
const AsyncRegister = asyncComponent(() => import('./view/Register'))
const AsyncReadingProgress = asyncComponent(() => import('./view/ReadingProgress'))
const AsyncReading = asyncComponent(() => import('./view/Reading2'))
const AsyncReadingProbation = asyncComponent(() => import('./view/Reading2/ReadingProbationContainer'))
const AsyncNote = asyncComponent(() => import('./view/Note'))
const AsyncQuiz = asyncComponent(() => import('./view/Quiz'))
const AsyncPunch = asyncComponent(() => import('./view/Punch'))
const AsyncUserCourseList = asyncComponent(() => import('./view/UserCourseList'))
const AsyncBookInfo = asyncComponent(() => import('./view/BookInfo'))
const AsyncShareImage = asyncComponent(() => import('./view/ShareImage'))
const AsyncShareText = asyncComponent(() => import('./view/ShareText'))
const AsyncCreateNote = asyncComponent(() => import('./view/CreateNote'))
const AsyncClass = asyncComponent(() => import('./view/Class'))
const AsyncStoreItemDetail = asyncComponent(() => import('./view/StoreItemDetail'))
const AsyncCart = asyncComponent(() => import('./view/Cart'))
const AsyncPostOrder = asyncComponent(() => import('./view/PostOrder'))
const AsyncOrderList = asyncComponent(() => import('./view/OrderList'))
const AsyncPunchProbation = asyncComponent(() => import('./view/PunchProbation'))
const AsyncAdmissionNotice = asyncComponent(() => import('./view/AdmissionNotice'))
const AsyncReadingCard = asyncComponent(() => import('./view/ReadingCard'))
const AsyncMemo = asyncComponent(() => import('./view/Memo'))
const AsyncReading2 = asyncComponent(() => import('./view/Reading2'))
const AsyncReading2Probation = asyncComponent(() => import('./view/Reading2Probation'))
const AsyncRoundTable = asyncComponent(() => import('./view/RoundTable'))
const AsyncRoundTableContent = asyncComponent(() => import('./view/RoundTableContent'))
const AsyncAlertSetting = asyncComponent(() => import('./view/AlertSetting'))
const AsyncSharePropagandist = asyncComponent(() => import('./view/SharePropagandist'))
const AsyncArticleList = asyncComponent(() => import('./view/ArticleList'))
const AsyncCreatePost = asyncComponent(() => import('./view/CreatePost'))
const AsyncPost = asyncComponent(() => import('./view/Post'))
const AsyncWebLog = asyncComponent(() => import('./view/WebLog'))
const AsyncLogInCheck = asyncComponent(() => import('./view/LogInCheck'))
const AsyncAdPage = asyncComponent(() => import('./view/AdPage')) 
const AsyncReceiveGift = asyncComponent(() => import('./view/ReceiveGift'))
const AsyncArticle = asyncComponent(() => import('./view/Article'))
const AsyncGiftImage = asyncComponent(() => import('./view/GiftImage'))
const AsyncDailyReading = asyncComponent(() => import('./view/DailyReading'))
const AsyncComponentTest = asyncComponent(() => import('./view/ComponentTest'))
const AsyncCourseIntro = asyncComponent(() => import('./view/CourseIntro'))
const AsyncProbationList = asyncComponent(() => import('./view/ProbationList'))
const AsyncUserGuide = asyncComponent(() => import('./view/UserGuide'))
const AsyncReadingProcess = asyncComponent(() => import('./view/ReadingProcess2'))
const AsyncUserBookNotes = asyncComponent(() => import('./view/UserBookNotes'))
const AsyncInvitation = asyncComponent(() => import('./view/Invitation'))
const AsyncBookNoteList = asyncComponent(() => import('./view/BookNoteList'))
const AsyncStudentCard = asyncComponent(() => import('./view/StudentCard'))
const AsyncStore = asyncComponent(() => import('./view/Store'))
const AsyncScoreRule = asyncComponent(() => import('./view/ScoreRule'))
const AsyncCreateQuestion = asyncComponent(() => import('./view/CreateQuestion'))
const AsyncQuestion = asyncComponent(() => import('./view/Question'))
const AsyncUserQuestionList = asyncComponent(() => import('./view/UserQuestionList'))
const AsyncGift = asyncComponent(() => import('./view/Gift'))
const AsyncRetail = asyncComponent(() => import('./view/Retail'))
const AsyncRetailList = asyncComponent(() => import('./view/Retail/RetailList'))
const AsyncRetailRules = asyncComponent(() => import('./view/Retail/RetailRules'))
const AsyncSettleList = asyncComponent(() => import('./view/Retail/SettleList'))
const AsyncOrderDetail = asyncComponent(() => import('./view/OrderDetail'))

const AsyncAdInitial = asyncComponent(() => import('./view/AdInitial'))

 

const MainRoute = ({ match }) => (
  <MainContainer>
    <Route path={`${match.url}/home/:type?/:course_id?`} component={AsyncHome} />
    <Route path={`${match.url}/square`} component={AsyncSquare}/>
    <Route path={`${match.url}/user`} component={AsyncUser}/>
  </MainContainer>
)

const CourseRoute = ({ match }) => (
  <Course>
    <Route path={`${match.url}/reading-process/:course_id`} component={AsyncReadingProcess}/>
    <Route path={`${match.url}/today/:course_id`} component={AsyncReadingCard}/>
    <Route path={`${match.url}/class/:course_id`} component={AsyncClass}/>
    <Route path={`${match.url}/round-table/:course_id`} component={AsyncRoundTable}/>
  </Course>
)

const RetailRoute = ({ match }) => (
  <Retail>
    <Route path={`${match.url}/retail-list`} component={AsyncRetailList}/>
    <Route path={`${match.url}/retail-rules`} component={AsyncRetailRules}/>
    <Route path={`${match.url}/settle-list`} component={AsyncSettleList}/>
  </Retail>
)


const RouteConfig = ( 
  <HashRouter>
    <ApiKeyLoader>  
      <App>  
        <Route path='/main' component={MainRoute} />
        <Route path='/register' component={AsyncRegister}/>
        <Route path='/reading/:course_id/:id/:page_name/:drawer?' component={AsyncReading}/>
        <Route path='/reading-probation/:course_id/:id/:page_name/:drawer?' component={AsyncReadingProbation}/>
        <Route path='/reading-probation-unicom/:course_id/:id/:page_name/:drawer?' component={AsyncReadingProbation}/>
        <Route path='/reading-probation-finished/:course_id/:id/:page_name/:drawer?' component={AsyncReadingProbation}/>
        <Route path='/reading2/:course_id/:id/:page_name/:drawer?' component={AsyncReading}/>
        <Route path='/reading2-probation/:id/:page_name/:drawer?' component={AsyncReading}/>
        <Route path='/note/:id' component={AsyncNote}/>
        <Route path='/quiz/:lesson_id' component={AsyncQuiz}/>
        <Route path='/quiz-probation/:lesson_id' component={AsyncQuiz}/>
        <Route path='/punch/:lesson_id' component={AsyncPunch}/>
        <Route path='/punch-probation/:lesson_id' component={AsyncPunch}/>
        <Route path='/user-course-list' component={AsyncUserCourseList}/>
        <Route path='/book-info/:id' component={AsyncBookInfo}/>
        <Route path='/share-img/:lesson_id' component={AsyncShareImage}/>
        <Route path='/memo/:course_id/:lesson_id' component={AsyncMemo}/>
        <Route path='/share-text' component={AsyncShareText}/>
        <Route path='/create-note/:source_type?/:round_table_id?' component={AsyncCreateNote}/>
        <Route path='/user-book-notes' component={AsyncUserBookNotes}/>
        <Route path='/user-course-info/:id' component={AsyncCourseIntro}/>
        <Route path='/course-intro/:id' component={AsyncCourseIntro}/>
        <Route path='/invitation/:course_id?' component={AsyncInvitation}/>
        <Route path='/book-note-list/:book_id' component={AsyncBookNoteList}/>
        <Route path='/student-card' component={AsyncStudentCard}/>
        <Route path='/store' component={AsyncStore}/>
        <Route path='/score-rule' component={AsyncScoreRule}/>
        <Route path='/create-question/:source_type?/:round_table_id?' component={AsyncCreateQuestion}/>
        <Route path='/question/:id' component={AsyncQuestion}/>
        <Route path='/user-question-list' component={AsyncUserQuestionList}/>

        <Route path='/gift' component={AsyncGift}/>
        <Route path='/gift-img/:id' component={AsyncGiftImage}/>
        <Route path='/component-test' component={AsyncComponentTest}/>
        <Route path='/probation-list/:course_id' component={AsyncProbationList}/>
        <Route path='/probation-list-unicom/:course_id' component={AsyncProbationList}/>
        <Route path='/user-guide/:course_id?' component={AsyncUserGuide}/>
        <Route path='/course' component={CourseRoute}/>
        <Route path='/store-item-detail/:id' component={AsyncStoreItemDetail}/>
        <Route path='/cart' component={AsyncCart}/>
        <Route path='/created-orders/:id/:purchase_type?/:redirect_url?' component={AsyncPostOrder}/>
        <Route path='/order-list' component={AsyncOrderList}/>
        <Route path='/order-detail/:id' component={AsyncOrderDetail}/>
        <Route path='/admission-notice/:course_id' component={AsyncAdmissionNotice}/>
        <Route path='/share-propagandist' compoent={AsyncSharePropagandist}/>
        <Route path='/reading-card/:course_id/:lesson_id' component={AsyncReadingCard}/>
        <Route path='/alert-setting' component={AsyncAlertSetting}/>
        <Route path='/article/:article_id' component={AsyncArticle}/>
        <Route path='/articles' component={AsyncArticleList}/>
        <Route path='/round-table-content/:id' component={AsyncRoundTableContent}/>
        <Route path='/create-post/:source_type?/:round_table_id?' component={AsyncCreatePost}/>
        <Route path='/post/:round_table_id/:id' component={AsyncPost}/>
        <Route path='/web-log' component={AsyncWebLog}/>
        <Route path='/log-in-check/:token' component={AsyncLogInCheck}/>
        <Route path='/ad-page/:course_id' component={AsyncAdInitial}/>
        <Route path='/ad-page-unicom/:course_id' component={AsyncAdInitial}/>
        <Route path='/daily-reading/:course_id' component={AsyncDailyReading}/>
        <Route path='/receive-gift/:gift_id' component={AsyncReceiveGift}/>
        <Route path='/retail' component={RetailRoute}/>
      </App>
    </ApiKeyLoader>
  </HashRouter>
)

export default RouteConfig 