import React from 'react';
import {Link} from 'react-router-dom';
import { ROOT_URL } from '../../../api/const'

export default class OrderDetailItem extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }


  render() {
    const {  name, price, picture, desc } = this.props

  
    return (
        <div className='order-info'>
          <span className='order-picture'>
               <img src={ROOT_URL+picture}/>
           </span>
           <span className='order-abstract'>
                <div className='order-title'>
                  { name }
                </div> 
                  
                {desc.length>18?(<div className='order-introduction'>
                { desc.substring(0,17)+'......' }</div>):(desc.length>0?(
                  <div className='order-introduction'>{desc}</div>):(
                  <div className='order-introduction-less'>{desc}</div>))}
              
              <div className='order-count-price'>
                  <span className='count'>x1</span>
                  <span className='num'>
                    <span className='mark'>¥</span>
                    { price }
                  </span>
              </div>
           </span>
        </div>
    );
  }
}



