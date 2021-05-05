import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss'
export default class SettleItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }


  render() {
    const { pay_order_number, pay_method, pay_dt, pay_total } = this.props
  
    return (
        <div className='settle-item-container'>
          <div className='time'>{ pay_dt.substring(0,4)+'年'+pay_dt.substring(5,7)+'月' }</div>
          <div  className='settle-item'>
              <div className='settle-info'>
                  <div className='info-line'>
                      交易单号：{ pay_order_number }
                  </div>
                  <div className='info-line'>
                      打款方式：{ pay_method }
                  </div>
                  <div className='info-line'>
                      打款时间：{ pay_dt }
                  </div>
              </div>
              <div className='amount'>
                  <span className='label'>￥</span>{ pay_total }
              </div>
              
          </div>
        </div>
    );
  }
}



