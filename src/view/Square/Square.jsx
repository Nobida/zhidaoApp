import React from 'react';
import { Link } from 'react-router-dom';
import {LabelTabContainer, LabelTabItem} from "../../common_component/LabelTabs/index";
import Card from '../../common_component/Card';
import RoundTable from '../../view/RoundTable';
import ArticleList from '../ArticleList';
import "./style.scss";

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem:0
    }
  }
  handleIndexChange(i){
    this.setState({
      activeItem:i
    })
  }
  componentDidMount(){

  }

  render() {

    return (
      <div className='square'>
        <LabelTabContainer activeItem={this.state.activeItem} handleIndexChange={this.handleIndexChange.bind(this)}>
          <LabelTabItem>
            文章
          </LabelTabItem>
          <LabelTabItem>
            圆桌
          </LabelTabItem>
        </LabelTabContainer>
        <div className='square-content'>
          {this.state.activeItem?(<RoundTable/>):(<ArticleList/>)}
        </div>
      </div>
    );
  }
}
