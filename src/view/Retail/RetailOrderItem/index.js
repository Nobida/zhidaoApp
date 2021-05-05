import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss'
import { ROOT_URL } from '../../../api/const'
import {  money } from '../../../svg'


export default class RetailOrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_id: ''
    }
  }
  componentDidMount() {
    const {actions, match} = this.props;

  }


  handleNavIndexChange(value){
    const {actions, history} = this.props;
    history.replace('/retail-detail/'+value);
  }
  render() {

    const {  course, student, create_dt, credit, status, course_price, course_picture } = this.props


  
    return (
      <div className="retail-order-item">
          <div className='order-info'>
             <div className='order-picture'>
                 <img src={ROOT_URL+course_picture}/>
             </div>
             <div className='order-abstract'>
                 <div className='order-name'>
                        { course }
                 </div>
                 <div className='order-price'>
                    <span>购买价格：{ course_price }</span>
                    <span>购买数量：1</span>
                 </div> 
                 <div className='order-user'>
                     购买用户：{ student }
                 </div>
                 <div className='order-time'>
                    下单时间：{ create_dt }
                 </div>
             </div> 
          </div>
          {status==='待结算'?(
            <div className='order-option'>
              <div className='retail-price'>
                <span className='money-icon'>
                  { money }
                </span>
                <span className='num'>{ credit/10 }</span>
              </div>
                <span className='status'>{ status }</span>
            </div>):(status==='已结算'?
            (<div className='other-order-option'>
              <div className='retail-price'>
                <span className='money-icon'>
                  { money }
                </span>
                <span className='num'>{ credit/10 }</span>
              </div>
                <span className='status'>{ status }</span>
            </div>):(<div className='other-order-option'>
              <div className='retail-price'>
                <span className='money-icon'>
                  { money }
                </span>
                <span className='num'>{ credit/10 }</span>
              </div>
                <span className='reason'>原因：已退课</span>
                <span className='status'>{ status }</span>
            </div>))}
      </div>
    );
  }
}

