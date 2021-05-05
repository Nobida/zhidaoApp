import React from 'react';
import { BottomNav, BottomNavItem } from '../../common_component/BottomNav';
import { book, clock, user } from '../../svg';
import Home from '../Home';
import ReadingProgress from '../ReadingProgress';
import User from '../User';
import './style.scss';

export default class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  handleIndexChange(i){
    let path_name = '';
    switch (i){
      case 0:
        path_name = 'home';
        break;
      case 1:
        path_name = 'reading-progress';
        break;
      case 2:
        path_name = 'user';
        break;
      default:
        path_name = 'home';
        break;
    }
    const { history } = this.props;
    const cur_path = this.props.match.params.page_name;
    if (cur_path != path_name) {
      if (cur_path == 'home') {
        history.push('/main/' + path_name);
      } else {
        history.replace('/main/' + path_name)
      }
    }
  }

  setPageIndex(page_name){
    let page_index = 0;
    switch (page_name){
      case 'home':
        page_index = 0;
        break;
      case 'reading-progress':
        page_index = 1;
        break;
      case 'user':
        page_index = 2;
        break;
      default:
        page_index = 0;
        break;
    }
    this.setState({ activeIndex: page_index });
  }

  componentWillMount(){
    console.log('MainContainer will mount');
    this.setPageIndex(this.props.match.params.page_name);
  }

  componentWillReceiveProps(nextProps){
    console.log('MainContainer will receive props');
    this.setPageIndex(nextProps.match.params.page_name)
  }

  render() {
    console.log('MainContainer render');
    return (
      <div className="main-container">
        {this.props.children}
        <BottomNav
          handleIndexChange={this.handleIndexChange.bind(this)}
          activeItem={this.state.activeIndex}
        >
          <BottomNavItem icon={book} label="今日"/>
          <BottomNavItem icon={clock} label="进度"/>
          <BottomNavItem icon={user} label="我的"/>
        </BottomNav>
      </div>
    );
  }
}
