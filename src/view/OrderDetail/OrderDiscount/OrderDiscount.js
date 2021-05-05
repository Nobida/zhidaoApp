


import React from 'react';
import {Link} from 'react-router-dom'; 
import { question_mark } from '../../../svg'





export default class OrderDiscount extends React.Component {
  constructor(props) {
    super(props);
  } 

  componentDidMount() {
    const { actions, order_id } = this.props
    console.log('start')
    actions.fetchOrderDetailRecord(order_id)
    
  }



  handleChangeToRule() {
    const { history } = this.props;
    history.replace('/score-rule');
  }



  render() {

    const { order_detail_record, order_id } = this.props


    
    return (
      <div>
        <div className='discount'>
          <div className='discount-info'>
            <div className='point-discount'>
              <span className="count">积分折扣：</span>
              <span className='point-rule' onClick={ this.handleChangeToRule.bind(this) }>
                { question_mark }
              </span>
            </div>
              <span className='money'>¥ { order_detail_record.discount }</span>
          </div>
          <div className='discount-info'>
            <div className='point-discount'>
              <span className="count">其他折扣：</span>
            </div>
              <span className='money'>¥ 0</span>
          </div>
          <div className='discount-info'>
            <div className='point-discount'>
              <span>订单总价：</span>
            </div>
              <span className='money'>¥ { order_detail_record.true_price }</span>
          </div>
            <div className='border'></div>
        </div>
        <div className='actually-paid'>
            <span className='actually-paid-text'>实付金额：</span>
            <span className='num'>
                <span className='mark'>¥</span>
                  { order_detail_record.true_price }
            </span>
        </div>
      </div>
    );
  }
}
