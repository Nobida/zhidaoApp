import React from 'react';
import Button from '../../../common_component/Button';
import TextField from '../../../common_component/TextField';
import TextArea from '../../../common_component/TextArea';
import FormItem from '../../../common_component/FormItem';
import Toast from '../../../common_component/Toast';
import { MAIN_URL, ORDER_URL } from "../../../api/const";
import {
  SelectionContainer,
  SelectionItem,
} from "../../../common_component/Selection";

export default class CreateGift extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      to: '',
      text:'',
      showToast:false,
      toastMsg:'',
      coupon:'',
      toastStatus:'',
      couponStatus:'',
      product:''
    }
  }

  handleProductChange(value){
    console.log(value)
    this.setState({product:value})
  }

  handleCreateGift(){
    const {actions} = this.props;
    const {to,text,product} = this.state;
    if(to!='' && text!='' && product!='') {
      const data = {
        product,
        theme: 'SpringFestival',
        to,
        text
      };
      actions.createGift(data);
    }else{
      this.setState({
        showToast: true,
        toastMsg: '请填写完整',
      });
    }

  }

  handleCouponChange(text){
    const {actions} = this.props;
    this.setState({coupon:text,showToast:false});
    if(text.length == 10){
      actions.fetchCurCoupon(text);
    }else{
      if(text.length==0){
        this.setState({couponStatus: ''});
      }else {
        this.setState({couponStatus: 'fail'});
      }
    }
  }
  handleToTextChange(text){
    this.setState({to:text,showToast:false})
  }
  handleTextChange(text){
    this.setState({text:text,showToast:false})
  }
  componentDidMount(){
    const {actions} = this.props;
    actions.fetchProductsCanBeUsedAsGift();
  }
  componentWillReceiveProps(nextProps) {
    const {gifts,cur_post_gift,apikey,cur_coupon} = nextProps;
    console.log(nextProps);
    if(cur_post_gift.posting_gift){
      this.setState({
        showToast: true,
        toastMsg: '正在提交',
        toastStatus: 'loading'
      });
    }
    if(cur_coupon.fetching_coupon){
      this.setState({
        couponStatus:'loading'
      })
    }else{
      if(cur_coupon.error_info){
        this.setState({
          couponStatus:'fail'
        })
      }else if(cur_coupon.cur_coupon.usable){
        this.setState({
          couponStatus:'success'
        })
      }
    }

    if(cur_post_gift.success_info){
      let redirect_url = MAIN_URL+'#/gift-img/'+cur_post_gift.success_info.uuid;
      let order_url = ORDER_URL + '?apikey='+apikey+'&gift='+cur_post_gift.success_info.uuid+'&redirect='+encodeURIComponent(redirect_url);
      if(this.state.couponStatus=='success'){
        window.location.href=order_url+'&coupon='+this.state.coupon;
      }else{
        window.location.href=order_url;
      }
    }
  }

  render(){

    const gift_products = this.props.gift_products.products;
    const gift_products_items = gift_products&&gift_products.length?gift_products.map((d,i)=>{
      return (<SelectionItem value={d.uuid} key={i}>{d.name}</SelectionItem>)
    }):null
   
    return (
      <div> 
          <FormItem>
            <TextField label="To:" value={this.state.to} onInput={this.handleToTextChange.bind(this)}/>
          </FormItem>
          <FormItem label="寄语">
            <TextArea className="send-words" onInput={this.handleTextChange.bind(this)}/>
          </FormItem>
          <FormItem label="选择要赠送的课程">
            {gift_products_items?(
              <SelectionContainer label="请选择" onSelectionChange={this.handleProductChange.bind(this)}>
                {gift_products_items}
              </SelectionContainer>
            ):null}
            
          </FormItem>
          <FormItem> 
            <TextField label="折扣券:" value={this.state.coupon} onInput={this.handleCouponChange.bind(this)} status={this.state.couponStatus}/>
          </FormItem> 


          <br/>

          <Button onClick={this.handleCreateGift.bind(this)}>
            赠送好友
          </Button>
        <Toast
          show={this.state.showToast}
          message={this.state.toastMsg}
          status={this.state.toastStatus}
          autoHide
        />

      </div>
    );
  }
}
