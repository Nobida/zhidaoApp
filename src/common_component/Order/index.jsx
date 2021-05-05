import React from 'react';

import StoreListItem from '../MediaItem/StoreListItem';
import {ROOT_URL} from "../../api/const";

export default class Order extends React.Component {

  constructor(props){
      super(props);
  }

  getSumScore(){
    let sum = 0;
    console.log(this.props);
    for(let i = 0; i < this.props.order.items.length; i++){
      if(this.props.order && this.props.order.use_score){
        sum += this.props.order.items[i].score;
      }else{
        sum += this.props.order.items[i].price;
      }

    }
    return sum;
  }

  getStatus(){
    switch (this.props.order.status){
        case 'created':
            return '未付款';
        case 'payed':{
            if(this.props.order.sent && !this.props.order.received)
              return '已发货';
            if(this.props.order.received)
              return '已收货';
            return '等待发货';
          }
        case 'refunded':
            return '已退款';
        default:
            return '状态错误';
    }
  }


  render() {
    let sums = this.getSumScore();
    let status = this.getStatus();
    const {use_score} = this.props.order;
    return(
      <div className = "order">
          { this.props.order.items&&this.props.order.items.length?this.props.order.items.map(function(d,i){
            return (
              <div key = {d.id} className="store-item-container">
                  <StoreListItem name={d.name} uuid = {d.product} score={d.score} price={d.price} use_score={use_score} img={ROOT_URL+d.picture}/>
              </div>
            )
          }):null}
          <div className="info-container">
            {/*<div className="price"> 总价格：<b>{sums+ (this.props.order && this.props.order.use_score?'积分':'元')}</b></div>*/}
            <div className="status">状态： <b>{status}</b></div>
            <div className="create-dt">{this.props.order.create_dt}</div>
          </div>
      </div>
    )
  }
}
