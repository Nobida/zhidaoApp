import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../../common_component/Avatar';
import Icon from '../../common_component/Icon';
import Button from '../../common_component/Button';
import IconButton from '../../common_component/IconButton';
import { bookS, question, setting, note, comment, shelf, userAdd,menu,gift } from "../../svg";
import './style.scss';

class UserHead extends React.Component {
  render() {
    const { user_info, score, punch } = this.props;
    return (
      <div className="user-head">
        <Avatar size="lg" src={user_info.headimgurl}/>
        <div className="nickname">{user_info.nickname}</div>
        <div className='user-info'>
          <div className="info-item">
            <span> 考勤 &nbsp; </span><span><b>{punch}</b></span>
          </div>
          <div className="info-item">
            <span> 积分 &nbsp; </span> <span><b>{score}</b></span>
          </div>
        </div>
      </div>

    );
  }
}

class UserTools extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="tools">
        <div className="tool-icon">
          <Link to="/user-course-list">
            <Icon icon={shelf}/>
            <div className="label">我的课程</div>
          </Link>
        </div>
        <div className="tool-icon">
          <Link to="/order-list">
            <Icon icon={menu}/>
            <div className="label">我的订单</div>
          </Link>
        </div>
        <div className="tool-icon">
          <Link to="/store">
            <Icon icon={bookS}/>
            <div className="label">积分兑换</div>
          </Link>
        </div>
        <div className="tool-icon">
          <Link to="/user-guide">
            <Icon icon={comment}/>
            <div className="label">学员须知</div>
          </Link>
        </div>
        <div className="tool-icon">
          <Link to="/user-book-notes">
            <Icon icon={note}/>
            <div className="label">我的笔记</div>
          </Link>
        </div>
        <div className="tool-icon">
          <Link to="/user-question-list">
            <Icon icon={question}/>
            <div className="label">我的问题</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('User did mount');
    const {actions} = this.props;
    actions.fetchUserStat();
  }

  render() {
    console.log('User render');

    console.log(this.props)
    const { user_stat, user_info } = this.props;

    return (
      <div>
        <div className="user">
          {user_info.invitation_use_credit?(
          <div className='avator-retail'>
            <Link to='/retail/retail-list'><Button>分销</Button></Link>
          </div>):<div></div>}        
          <UserHead
            user_info={user_info}
            punch={user_stat.punch?user_stat.punch.total:0}
            score={user_stat.score?user_stat.score.total:0}
          />
          <UserTools/>
          <Link to='/gift'>

            <IconButton icon={gift} className='gift-btn' label='赠送好友' inverse={true}/>
          </Link>
          <br/>
          <Link to='/invitation'><Button>邀请好友</Button></Link>
        </div>
      </div>
    );
  }
}
