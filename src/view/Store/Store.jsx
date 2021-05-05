import React from 'react';
import { Link } from 'react-router-dom';
import StoreListItem from '../../common_component/MediaItem/StoreListItem';
import IconButton from '../../common_component/IconButton';
import { cart } from "../../svg";
import Icon from '../../common_component/Icon';
import { right } from "../../svg";
import {ROOT_URL,SCORE_RULE_ID} from "../../api/const";
import "./style.scss";

export default class Store extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log('Store did mount');
    const { actions } = this.props;
    actions.fetchUserStat();
    actions.fetchProducts();

  }

  render() {
    console.log('Store render');
    const { user_stat,products } = this.props;
    console.log(this.props);
    return (
      <div className='store'>
        <div className="header">
          <div className="left">
            <span>
              我的积分&nbsp;
            </span>
            <span className="score">{user_stat.score?user_stat.score.total:0}</span>
            <Link to={'/score-rule'}><Icon icon={right} size="xs"/></Link>
          </div>

          <div className="right">
            <span>
              <Link to={'/order-list'}>我的订单 &nbsp;</Link>
            </span>

          </div>
        </div>
        <div className="store-container">

          { products&&products.length?products.map(function(d,i){
            return(
              <div key = {d.id}>
                <StoreListItem use_score={true} name={d.name} uuid = {d.uuid} score={d.score} img={ROOT_URL+d.picture}/>
              </div>
            )
          }):null}
        </div>
        <Link to={'/cart'}>
          <IconButton icon = {cart} className="iconbutton"></IconButton>
        </Link>
      </div>
    );
  }
}
