import React from 'react';
import {Link} from 'react-router-dom'; 

import {TagSwitchContainer, TagItem} from '../../../common_component/TagSwitch'; 
import {NavTabContainer, NavTabItem, NavHead, NavContent} from '../../../common_component/NavHead'
import './style.scss';
import { question_mark, kg } from '../../../svg'



export default class RetailDetail extends React.Component {
  constructor(props) {
    super(props);



  } 
  componentDidMount() {
    const { actions, credit_order_record  } =  this.props
    actions.fetchCreditOrderRecord(12337)
  }

  handleChangeToRule() {
    const { history } = this.props;

    history.replace('/score-rule');
  }





  render() {

    const { credit_order_record } = this.props
    console.log(this.props)
    
    return (
      <div className='content'>
        <NavHead className='head'> 
          <div>
              <div className='head-top'>
                订单详情
              </div>
              <div className='head-content'>
                支付成功
              </div> 
          </div>
        </NavHead>
        <div className='order-info'>
          <span className='order-picture'>
               <img src='http://zhidaorw.com//pic/banner/chinese/杜甫诗意图青绿山水.jpg'/>
           </span>
           <span className='order-abstract'>
                <div className='order-title'>
                  唐诗精读14天穿越班
                </div> 
                <div className='order-introduction'>
                  啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
                  <span className='order-introduction-more'>
                   ......</span>
                </div>
              <div className='order-count-price'>
                  <span className='count'>x1</span>
                  <span className='num'>
                    <span className='mark'>¥</span>
                    { credit_order_record.price }
                  </span>
              </div>
           </span> 
        </div>
        <div className='discount'>
          <div className='discount-info'>
            <div className='point-discount'>
              <span className="count">积分折扣：</span>
              <span className='point-rule' onClick={ this.handleChangeToRule.bind(this) }>
                { kg }
              </span>
            </div>
              <span className='money'>¥ { credit_order_record.discount }</span>
          </div>
          <div className='discount-info'>
            <div className='point-discount'>
              <span className="count">其他折扣：</span>
            </div>
              <span className='money'>¥ { credit_order_record.discount }</span>
          </div>
          <div className='discount-info'>
            <div className='point-discount'>
              <span>订单总价：</span>
            </div>
              <span className='money'>¥ { credit_order_record.price }</span>
          </div>
            <div className='border'></div>
        </div>

        <div className='actually-paid'>
          <span className='actually-paid-text'>实付金额：</span>
          <span className='num'>
              { credit_order_record.true_price }
          </span>
        </div>

        <div className='detail'>
          <div className='details-info'>
              <div className='order-number'>订单编号： 00005654
                <span className='copy-button'>复制</span>
              </div>
              <div className='contact-information'>交易时间： {credit_order_record.create_dt}</div>
              <div className='detailed-address'>付款时间： {credit_order_record.pay_dt}</div>
          </div>
        </div>
        <div className='comsumer'>
          <div className='cosumer-info'>
              <div className='receiver'>收货人：    
                <span className='consumer-info-detail'>
                  {credit_order_record.contact}
                </span>
              </div>
              <div className='contact-information'>联系方式： 
                <span className='consumer-info-detail'>{credit_order_record.phone}</span>
              </div>
              <div className='detailed-address'>详细地址： 
                <span className='consumer-info-detail'>{credit_order_record.address}</span>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
