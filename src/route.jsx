/**
 * route.jsx
 *
 * Route file contains all routers.
 *
 */

import React from "react";
import { Route, IndexRoute } from 'react-router';
import asyncComponent from './asyncComponent';
import { HashRouter } from 'react-router-dom';

import ApiKeyLoader from './containers/ApiKeyLoader';

import App from './view/App'
import MainContainer from './view/MainContainer'

import Loadable from "react-loadable";
import Loading from './common_component/Loadings';



import Register from './view/Register'
import Home from './view/Home';
import Home2 from './view/Home2';
import ReadingProgress from './view/ReadingProgress';
import User from './view/User';
import Reading from './view/Reading'
import Note from './view/Note'
import Quiz from './view/Quiz'
import Punch from './view/Punch'
import UserCourseList from './view/UserCourseList'
import BookInfo from './view/BookInfo'
import ShareImage from './view/ShareImage'
import ShareText from './view/ShareText'
import CreateNote from './view/CreateNote'




import UserBookNotes from "./view/UserBookNotes";
import Invitation from './view/Invitation';
import BookNoteList from './view/BookNoteList';
import StudentCard from './view/StudentCard';
import Store from './view/Store';
import ScoreRule from './view/ScoreRule';
import CreateQuestion from './view/CreateQuestion';
import Question from './view/Question';
import UserQuestionList from './view/UserQuestionList';
import Gift from './view/Gift';

import GiftImage from './view/GiftImage';
import DailyReading from './view/DailyReading';

import ComponentTest from './view/ComponentTest';
import MainContainerProbation from './view/MainContainerProbation';
import CourseIntro from './view/CourseIntro';
import ProbationList from './view/ProbationList';
import UserGuide from './view/UserGuide';

import Course from './view/Course2';
import ReadingProcess2 from './view/ReadingProcess2';



import Class from './view/Class';
import StoreItemDetail from './view/StoreItemDetail';
import Cart from './view/Cart';
import PostOrder from './view/PostOrder';
import OrderList from './view/OrderList';
import PunchProbation from './view/PunchProbation';
import AdmissionNotice from './view/AdmissionNotice';
import ReadingCard from './view/ReadingCard';
import Memo from './view/Memo';




// import Reading2 from './view/Reading2';
import Reading2Probation from './view/Reading2Probation';
import RoundTable from './view/RoundTable';
import RoundTableContent from './view/RoundTableContent';
import AlertSetting from './view/AlertSetting';


import SharePropagandist from './view/SharePropagandist';
import Square from './view/Square';
import ArticleList from './view/ArticleList';
import CreatePost from './view/CreatePost';
import Post from './view/Post';

import WebLog from './view/WebLog';
import LogInCheck from './view/LogInCheck';

import AdPage from './view/AdPage';
import ReceiveGift from './view/ReceiveGift'

import Article from './view/Article'

function lazyLoadComponent(lazyModule) {
  return (location, cb) => {
    lazyModule(module => cb(null, module))
  }
}

const AsyncRegister = asyncComponent(() => require('./view/Register'))
const AsyncReadingProgress = asyncComponent(() => require('./view/ReadingProgress'))
const AsyncUser = Loadable({
   loader: () => import('./view/User'),
   loading: Loading
});
const AsyncReading = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./view/Reading2').default)
  }, 'reading')
}
const AsyncNote = asyncComponent(() => require('./view/Note'))
const AsyncQuiz = asyncComponent(() => require('./view/Quiz'))
const AsyncPunch = asyncComponent(() => require('./view/Punch'))
const AsyncUserCourseList = asyncComponent(() => require('./view/UserCourseList'))
const AsyncBookInfo = asyncComponent(() => require('./view/BookInfo'))
const AsyncShareImage = asyncComponent(() => require('./view/ShareImage'))
const AsyncShareText = asyncComponent(() => require('./view/ShareText'))
const AsyncCreateNote = asyncComponent(() => require('./view/CreateNote'))
const AsyncHome = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./view/Home2').default)
  }, 'home')
}
const AsyncClass = asyncComponent(() => require('./view/Class'))
const AsyncStoreItemDetail = asyncComponent(() => require('./view/StoreItemDetail'))
const AsyncCart = asyncComponent(() => require('./view/Cart'))
const AsyncPostOrder = asyncComponent(() => require('./view/PostOrder'))
const AsyncOrderList = asyncComponent(() => require('./view/OrderList'))
const AsyncPunchProbation = asyncComponent(() => require('./view/PunchProbation'))
const AsyncAdmissionNotice = asyncComponent(() => require('./view/AdmissionNotice'))
const AsyncReadingCard = asyncComponent(() => require('./view/ReadingCard'))
const AsyncMemo = asyncComponent(() => require('./view/Memo'))
const AsyncReading2 = asyncComponent(() => require('./view/Reading2'))
const AsyncReading2Probation = asyncComponent(() => require('./view/Reading2Probation'))
const AsyncRoundTable = asyncComponent(() => require('./view/RoundTable'))
const AsyncRoundTableContent = asyncComponent(() => require('./view/RoundTableContent'))
const AsyncAlertSetting = asyncComponent(() => require('./view/AlertSetting'))
const AsyncSharePropagandist = asyncComponent(() => require('./view/SharePropagandist'))
const AsyncSquare = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./view/Square').default)
  }, 'square')
}
const AsyncArticleList = asyncComponent(() => require('./view/ArticleList'))
const AsyncCreatePost = asyncComponent(() => require('./view/CreatePost'))
const AsyncPost = asyncComponent(() => require('./view/Post'))
const AsyncWebLog = asyncComponent(() => require('./view/WebLog'))
const AsyncLogInCheck = asyncComponent(() => require('./view/LogInCheck'))
const AsyncAdPage = asyncComponent(() => require('./view/AdPage'))
const AsyncReceiveGift = asyncComponent(() => require('./view/ReceiveGift'))
const AsyncArticle = asyncComponent(() => require('./view/Article'))
const AsyncGiftImage = asyncComponent(() => require('./view/GiftImage'))
const AsyncDailyReading = asyncComponent(() => require('./view/DailyReading'))
const AsyncComponentTest = asyncComponent(() => require('./view/ComponentTest'))
const AsyncCourseList = asyncComponent(() => require('./view/CourseList'))
const AsyncMainContainerProbation = asyncComponent(() => require('./view/MainContainerProbation'))
const AsyncCourseIntro = asyncComponent(() => require('./view/CourseIntro'))
const AsyncProbationList = asyncComponent(() => require('./view/ProbationList'))
const AsyncUserGuide = asyncComponent(() => require('./view/UserGuide'))
const AsyncCourse = asyncComponent(() => require('./view/Course2'))
const AsyncReadingProcess = asyncComponent(() => require('./view/ReadingProcess2'))
const AsyncUserBookNotes = asyncComponent(() => require('./view/UserBookNotes'))
const AsyncInvitation = asyncComponent(() => require('./view/Invitation'))
const AsyncBookNoteList = asyncComponent(() => require('./view/BookNoteList'))
const AsyncStudentCard = asyncComponent(() => require('./view/StudentCard'))
const AsyncStore = asyncComponent(() => require('./view/Store'))
const AsyncScoreRule = asyncComponent(() => require('./view/ScoreRule'))
const AsyncCreateQuestion = asyncComponent(() => require('./view/CreateQuestion'))
const AsyncQuestion = asyncComponent(() => require('./view/Question'))
const AsyncUserQuestionList = asyncComponent(() => require('./view/UserQuestionList'))
const AsyncGift = asyncComponent(() => require('./view/Gift'))


const MainRoute = ({ match }) => (
  <MainContainerProbation>
    <Route path={`${match.url}/home/:type:course_id`} getComponent={lazyLoadComponent(Home2)} />
    <Route path={`${match.url}/square`} getComponent={lazyLoadComponent(Square)}/>
    <Route path={`${match.url}/user`} component={AsyncUser}/>
  </MainContainerProbation>
)


const RouteConfig = (
  <HashRouter>
    <ApiKeyLoader>
      <App>
        <Route path='/main-probation/:page_name' children={({ match }) => (
          match?(
          <MainContainer>
              <Route path='/main-probation/home/:course_id?/:lesson_id?' getComponent={lazyLoadComponent(Home)}/>
              <Route path='/main-probation/reading-progress' component={AsyncReadingProgress}/>
              <Route path='/main-probation/user' getComponent={AsyncUser}/>
            </MainContainer>
          ):null)}/>

        <Route path='/main' component={MainRoute} />
        <Route path='/register' component={AsyncRegister}/>
        <Route path='/reading/:id/:page_name/:drawer?' getComponet={AsyncReading}/>
        <Route path='/reading-probation/:id/:page_name/:drawer?' getComponent={AsyncReading}/>
        <Route path='/reading-probation-finished/:id/:page_name/:drawer?' getComponent={AsyncReading}/>

        <Route path='/reading2/:course_id/:id/:page_name/:drawer?' getComponent={AsyncReading}/>
        <Route path='/reading2-probation/:id/:page_name/:drawer?' getComponent={AsyncReading}/>
        <Route path='/note/:id' component={AsyncNote}/>
        <Route path='/quiz/:lesson_id' children={({ match }) => (
          match ? (<Quiz/>):null
        )}/>
        <Route path='/quiz-probation/:lesson_id' children={({ match }) => (
          match ? (<Quiz/>):null
        )}/>
        <Route path='/punch/:lesson_id' children={({ match }) => (
          match ? (<Punch/>):null
        )}/>
        <Route path='/punch-probation/:lesson_id' children={({ match }) => (
          match ? (<PunchProbation/>):null
        )}/>

        <Route path='/user-course-list' children={({ match }) => (
          match ? (<UserCourseList/>):null
        )}/>
        <Route path='/book-info/:id' children={({ match }) => (
          match ? (<BookInfo/>):null
        )}/>
        <Route path='/share-img/:lesson_id' children={({ match }) => (
          match ? (<ShareImage/>):null
        )}/>
        <Route path='/memo/:course_id/:lesson_id' children={({ match }) => (
          match ? (<Memo/>):null
        )}/>
        <Route path='/share-text' children={({ match }) => (
          match ? (<ShareText/>):null
        )}/>
        <Route path='/create-note/:source_type?/:round_table_id?' children={({ match }) => (
          match ? (<CreateNote/>):null
        )}/>
        <Route path='/user-book-notes' children={({ match }) => (
          match ? (<UserBookNotes/>):null
        )}/>
        <Route path='/user-course-info/:id' children={({ match }) => (
          match ? (<CourseIntro/>):null
        )}/>
        <Route path='/course-intro/:id' children={({ match }) => (
          match ? (<CourseIntro/>):null
        )}/>
        <Route path='/invitation/:course_id?' children={({ match }) => (
          match ? (<Invitation/>):null
        )}/>
        <Route path='/book-note-list/:book_id' children={({ match }) => (
          match ? (<BookNoteList/>):null
        )}/>
        <Route path='/student-card' children={({ match }) => (
          match ? (<StudentCard/>):null
        )}/>
        <Route path='/store' children={({ match }) => (
          match ? (<Store/>):null
        )}/>
        <Route path='/score-rule' children={({ match }) => (
          match ? (<ScoreRule/>):null
        )}/>
        <Route path='/create-question/:source_type?/:round_table_id?' children={({ match }) => (
          match ? (<CreateQuestion/>):null
        )}/>
        <Route path='/question/:id' children={({ match }) => (
          match ? (<Question/>):null
        )}/>
        <Route path='/user-question-list' children={({ match }) => (
          match ? (<UserQuestionList/>):null
        )}/>

        <Route path='/gift' children={({ match }) => (
          match ? (<Gift/>):null
        )}
        />
        <Route path='/gift-img/:id' children={({ match }) => (
          match ? (<GiftImage/>):null
        )}
        />
        <Route path='/component-test' children={({ match }) => (
          match ? (<ComponentTest/>):null
        )}
        />
        <Route path='/probation-list' children={({ match }) => (
          match ? (<ProbationList/>):null
          )}
        />
        <Route path='/user-guide/:course_id?' children={({ match }) => (
          match ? (<UserGuide/>):null
          )}
        />
      <Route path='/course/:page_name/:course_id?' children={({ match }) => (
          match ? (
            <Course>
              <Route path='/course/reading-process/:course_id?' children={({ match }) => (
                match ? (<ReadingProcess2/>):null
              )}/>
              <Route path='/course/today/:course_id?' children={({ match }) => (
                match ? (<ReadingCard/>):null
              )}/>
              <Route path='/course/class/:course_id?' children={({ match }) => (
                match ? (<Class/>):null
              )}/>
              <Route path='/course/round-table/:course_id?' children={({match}) => (
                match ? (<RoundTable/>):null
              )}/>
          </Course>
          ):null
        )}/>
      <Route path='/store-item-detail/:id' children={({ match }) => (
          match ? (<StoreItemDetail/>):null
        )}/>
      <Route path='/cart' children={({ match }) => (
            match ? (<Cart/>):null
        )}/>
      <Route path='/created-orders/:id/:purchase_type?/:redirect_url?' children={({ match }) => (
            match ? (<PostOrder/>):null
        )}/>
      <Route path='/order-list' children={({ match }) => (
            match ? (<OrderList/>):null
        )}/>
       <Route path='/admission-notice/:course_id' children={({ match }) => (
            match ? (<AdmissionNotice/>):null
        )}/>
        <Route path='/share-propagandist' children={({ match }) => (
            match ? (<SharePropagandist/>):null
        )}/>
        <Route path='/reading-card/:course_id/:lesson_id' children={({match}) => (
          match ? (<ReadingCard/>):null
        )}/>
        <Route path='/alert-setting' children={({match}) => (
          match ? (<AlertSetting/>):null
        )}/>
        <Route path='/square' children={({match}) => (
          match ? (<Square/>):null
        )}/>
        <Route path='/article/:article_id' children={({match}) => (
          match ? (<Article/>):null
        )}/>
        <Route path='/articles' children={({match}) => (
          match ? (<ArticleList/>):null
        )}/>
        <Route path='/round-table-content/:id' children={({match}) => (
          match ? (<RoundTableContent/>):null
        )}/>
        <Route path='/create-post/:source_type?/:round_table_id?' children={({ match }) => (
          match ? (<CreatePost/>):null
        )}/>
        <Route path='/post/:round_table_id/:id' children={({ match }) => (
          match ? (<Post/>):null
        )}/>
        <Route path='/web-log' children={({match}) => (
          match ? (<WebLog/>):null
        )}/>
        <Route path='/log-in-check/:token' children={({match}) => (
          match ? (<LogInCheck/>):null
        )}/>
        <Route path='/ad-page/:course_id' children={({match}) => (
          match ? (<AdPage/>):null
        )}/>
        <Route path='/daily-reading/:course_id' children={({match}) => (
          match ? (<DailyReading/>):null
        )}/>
        <Route path='/receive-gift/:gift_id' children={({match}) => (
          match ? (<ReceiveGift/>):null
        )}/>

      </App>
    </ApiKeyLoader>
  </HashRouter>
);
export default RouteConfig;
