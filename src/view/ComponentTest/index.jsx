import React from 'react';
import './style.scss';
import PostListItem from '../../common_component/MediaItem/PostListItem';
import CourseListItem from '../../common_component/MediaItem/CourseListItem';
import UserListItem from '../../common_component/MediaItem/UserListItem';

const userItems = [
  {
    nickname: '王小贱',
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781615267,834481015&fm=27&gp=0.jpg',
    follow: true,
    intro: '这个人很懒，没有介绍'
  },
  {
    nickname: '杨东伟',
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781615267,834481015&fm=27&gp=0.jpg',
    follow: false,
    intro: '这个人很懒，没有介绍'
  }
];
const courseItems = [
  {
    name:'知道经典第一期A班',
    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526724774551&di=b0f7e8e9694489e04e7ef6869fef6be0&imgtype=0&src=http%3A%2F%2Fimg2.cache.netease.com%2Fhouse%2F2015%2F11%2F4%2F20151104115523e24a2.jpg'
  },
  {
    name:'知道经典第一期B班',
    background:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526725053814&di=0338ce7cdf3fb369abba6d754da62009&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F023b5bb5c9ea15ced802b51ebc003af33a87b23d.jpg'
  }
];
const postItems = [
  {
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781615267,834481015&fm=27&gp=0.jpg',
    nickname:'王小贱',
    time: '2018/01/20',
    title:'测试标题',
    contents:'测试文字',
    quote:'',
    own: true,
    typeTags: ['笔记']
  },
  {
    avatar:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1781615267,834481015&fm=27&gp=0.jpg',
    nickname:'杨东伟',
    time: '2018/01/20',
    title:'测试标题',
    contents:'测试文字',
    quote:'',
    own: false,
    typeTags: ['问答']
  }
];
export default class ComponentTest extends React.Component {

  constructor(props) {
    super(props);
  }


  render(){
    const postList = postItems.map(function(d,i){
      return (
        <PostListItem data={d} key={i}/>
      )
    });
    const courseList = courseItems.map(function (d,i) {
      return (
        <CourseListItem
          name={d.name}
          background={d.background}
        />
      )
    });
    const userList = userItems.map(function (d,i) {
      return (
        <UserListItem
          avatar={d.avatar}
          nickname={d.nickname}
          intro={d.intro}
          follow={d.follow}
        />
      )
    });
    return (
      <div className="component-test">
        <div>
          <h2>发布列表（PostListItem）</h2>
          {postList}
        </div>
        <div>
          <h2>课程列表（CourseListItem）</h2>
          {courseList}
        </div>
        <div>
          <h2>用户（UserListItem）</h2>
          {userList}
        </div>

      </div>
    )
  }
}
