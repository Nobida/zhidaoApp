import React from 'react';
import Button from '../../common_component/Button'
import Toast from '../../common_component/Toast'
import './style.scss';
export default class ReceiveGift extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      msg:'',
      showToast:false
    }
  }

  componentWillReceiveProps(nextProps){
    const pre_received_gift = this.props.cur_received_gift;
    const {cur_received_gift,history} = nextProps;
    if(!cur_received_gift.receiving_gift && pre_received_gift.receiving_gift){

      if(cur_received_gift.error){
        this.setState({msg:'礼物无效',showToast:true})
        setTimeout(()=>{
          this.setState({showToast:false})
        })

      } else{
        this.setState({msg:'领取成功，跳转到礼物介绍页面……',showToast:true})
        setTimeout(()=>{
         const received_gift = cur_received_gift.received_gift;
         if(received_gift && received_gift.product){
           const {product} = received_gift
           const product_strs = product.split(':');
           if(product_strs.length==2){
             history.replace('/course-intro/'+product_strs[1]);
           }

          this.setState({showToast:false})
         }

       },1000)
      }

    }
  }

  handleReceive(){
    const {actions,match} = this.props;
    const gift_id = match.params.gift_id;
    actions.receiveGift(gift_id);

  }

  render(){
    return (
      <div className="receive-gift theme-red">
        <Button className='receive-btn' onClick={this.handleReceive.bind(this)}>接受馈赠</Button>
        <Toast show={this.state.showToast} message={this.state.msg}/>
      </div>
    );
  }
}
