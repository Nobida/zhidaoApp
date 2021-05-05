import React from 'react';
import { BottomNav, BottomNavItem } from '../../common_component/BottomNav';
import { book, clock, user } from '../../svg';

import './style.scss';

export default class MainContainerProbation extends React.Component {

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
        path_name = 'square';
        break;
      case 2:
        path_name = 'user';
        break;
      default:
        path_name = 'home';
        break;
    }
    const { history } = this.props;
    const cur_path = this.props.location.pathname.split('/')[1];

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
      case '/main/home':
        page_index = 0;
        break;
      case '/main/square':
        page_index = 1;
        break;
      case '/main/user':
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
    this.setPageIndex(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps){
    console.log('MainContainer will receive props');
    this.setPageIndex(nextProps.location.pathname)
  }

  render() {
    console.log('MainContainer render');
    console.log(this.props)
    console.log(this.state.activeIndex)
    return (
      <div className="main-container-probition">
        {this.props.children}
        <BottomNav
          handleIndexChange={this.handleIndexChange.bind(this)}
          activeItem={this.state.activeIndex}
        >
          <BottomNavItem icon={book} label="课程" />
          <BottomNavItem icon={clock} label="广场"/>
          <BottomNavItem icon={user} label="我的"/>
        </BottomNav>
      </div>
    );
  }
}
