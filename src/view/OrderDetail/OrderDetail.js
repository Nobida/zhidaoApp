import React from 'react';
import {Link} from 'react-router-dom'; 
import { question_mark } from '../../svg'
import { TagSwitchContainer, TagItem } from '../../common_component/TagSwitch'; 
import { NavTabContainer, NavTabItem, NavHead, NavContent } from '../../common_component/NavHead'
import OrderDetailItem from './OrderDetailItem';
import OrderDiscount from './OrderDiscount'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './style.scss';




export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false
    } 

  } 

  componentDidMount() {
    const { actions, credit_order_record  } =  this.props
    actions.fetchOrderRecord(this.props.match.params.id)
    {this.state.copied?this.props.history.push('/order-list'):null}


  }

  componentWillReceiveProps(nextProps){
    nextProps.items.map((item) => {
      if(item.product.substring(0,4)==='book'){
        this.setState({'showPersonInfo':true})
      }})
    const { actions } = this.props
    actions.fetchOrderDetailRecord(nextProps.credit_order_record.order_id)
  }

  handleCopyOrderNumber() {
    this.setState({copied: true})
    alert("复制成功")
  }


  render() {

    const { credit_order_record, items, actions, history } = this.props
    const orderDetailItemList = items.map(function(d,i){
      return(
       <OrderDetailItem
          key={d.id}
          name={d.name}
          price={d.price}
          picture={d.picture}
          desc={d.desc}  
        />
      )
    });

    console.log("credit_order_record.order_id")
    


    
    return (
      <div className='content'>
        <NavHead className='head'> 
          <div>
              <div className='head-content'>
                支付成功
              </div> 
          </div>
        </NavHead>
        <div>
          { orderDetailItemList }
        </div>
          {credit_order_record.order_id?(
          <OrderDiscount order_id={credit_order_record.order_id}/>):''}
        <div className='detail'>
          <div className='details-info'>
              <div className='order-number'>订单编号： { credit_order_record.id }
                <CopyToClipboard text={ credit_order_record.id }
                  onCopy={() => this.handleCopyOrderNumber()}>
                  <span className='copy-button'>复制</span>
                </CopyToClipboard>
              </div>
              <div className='contact-information'>交易时间： {credit_order_record.create_dt }</div>
              <div className='detailed-address'>付款时间： {credit_order_record.pay_dt }</div>
          </div>
        </div>
        <div className='comsumer'>
          {this.state.showPersonInfo?(
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
            </div>):null}
        </div>
      </div>
    );
  }
}
