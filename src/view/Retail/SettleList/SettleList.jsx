import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import SettleItem from '../SettleItem';
import {NavTabContainer, NavTabItem, NavHead, NavContent} from '../../../common_component/NavHead'


export default class SettleList extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    const {actions, match} = this.props;
    actions.fetchCreditPayRecord()
  }
  render() {
    const { credit_pay_record } = this.props


    const creditPayRecordList = credit_pay_record.map(function(d,i){
      return(
       <SettleItem
          key={i}
          pay_order_number={d.pay_order_number}
          pay_method={d.pay_method}
          pay_dt={d.pay_dt}
          pay_total={d.pay_total}
        />
      )
    });
  
    return (
      <div>
        <div className="settle-item-intro">
          <span className="settlement-information">结算信息</span>
          <span className="settlement-amount">结算金额</span>
        </div>
        <div className="settle-list">
          { creditPayRecordList }    
        </div>
      </div> 
    );
  }
}
