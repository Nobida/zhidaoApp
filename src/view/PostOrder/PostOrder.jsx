import React from 'react';
import { Link } from 'react-router-dom';
import Order from '../../common_component/Order';
import Button from '../../common_component/Button';
import FormItem from '../../common_component/FormItem';
import TextField from '../../common_component/TextField';
import Toast from '../../common_component/Toast';
import {ORDER_URL, MAIN_URL} from '../../api/const';
import {Drawer,DrawerContent} from '../../common_component/Drawer';
import ConfirmButtons from '../../common_component/MediaItem/ConfirmButtons';
import {getParamStr} from '../../utils/path_helper'
import "./style.scss";


export default class PostOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      address: "",
      contact: "",
      warning: false,
      showConfirm: false
    }
  }

  handlePhoneTextChange(value){
    console.log(value)
    this.setState({ phone: value })
  }

  handleAddressTextChange(value){
    console.log(value)
    this.setState({ address: value })
  }

  handleContactTextChange(value){
    console.log(value)
    this.setState({ contact: value })
  }

  handleOrderMsg(){
    const{ actions} = this.props;
    actions.modifyOrderMessage({
      orderID: this.props.match.params.id,
      phone: this.state.phone,
      address: this.state.address,
      contact: this.state.contact,
    })
  }

  modifyLocation(){
    const{ phone, address, contact} = this.state;
    if(phone != "" && address != "" && contact != ""){
      const{ actions} = this.props;
      actions.modifyOrderMessage({
        orderID: this.props.match.params.id,
        phone: this.state.phone,
        address: this.state.address,
        contact: this.state.contact,
      })
    }else{
      this.setState({ warning: true });
      setTimeout(function(){
        o.setState({warning: false});
      }, 3000);
    }
  }

  handlePurchase(){
    const{ phone, address, contact} = this.state;
    let o = this;
    if(phone != "" && address != "" && contact != ""){
      const{ actions} = this.props;
      actions.modifyOrderMessage({
        orderID: this.props.match.params.id,
        phone: this.state.phone,
        address: this.state.address,
        contact: this.state.contact,
      })
    }
    else{
      this.setState({ warning: true });
      setTimeout(function(){
        o.setState({warning: false});
      }, 3000);
    }
  }

  componentDidMount(){
    console.log('created order did mount');
    const{ actions} = this.props;
    const productID = this.props.match.params.id;
    actions.getCreatedOrderById(productID);
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      phone: nextProps.created_order.phone,
      address: nextProps.created_order.address,
      contact: nextProps.created_order.contact,
    });
    const{ modifying_order_msg} = this.props;
    if(modifying_order_msg && !nextProps.modifying_order_msg)
    {
      //actions.getCreatedOrderById(productID);
      let redirect_url = this.props.match.params.redirect_url;
      if(!redirect_url) redirect_url = encodeURIComponent(MAIN_URL+'#/order-list');
    //console.log(redirect_url)
      window.location.href = ORDER_URL+"?apikey="+ this.props.apikey+"&product_order="+this.props.match.params.id+'&redirect='+redirect_url +getParamStr('&');

    }
  }

  hideConfirm(){
    this.setState({showConfirm:false})
  }
  showConfirm(){
    const{ phone, address, contact} = this.state;
    let o = this;
    if(phone != "" && address != "" && contact != ""){
      this.setState({showConfirm: true})
    }
    else{
      this.setState({ warning: true });
      setTimeout(function(){
        o.setState({warning: false});
      }, 3000);
    }

  }

  render() {
    console.log('created order render');
    const{ created_order} = this.props;
    const purchase_type = this.props.match.params.purchase_type;
    console.log(this.props);
    const o = this;
    return (
      <div className="created-orders">
        <p className='text-muted'>请先填写并确认地址和联系方式，姓名须填写真实姓名，收货地址需要包含省份、市（区）、县（县级市）、乡镇、街道小区的详细信息，港澳台及海外地区暂不支持配送</p>
        <FormItem>
          <TextField label="手机号" onInput={o.handlePhoneTextChange.bind(o)} value = {o.state.phone}/>
        </FormItem>
        <FormItem>
          <TextField label="收货人姓名" onInput={o.handleContactTextChange.bind(o)} value = {o.state.contact}/>
        </FormItem>
        <FormItem>
          <TextField label="收货地址" onInput={o.handleAddressTextChange.bind(o)} value = {o.state.address}/>
        </FormItem>
        <br/>
        {created_order.items&&created_order.items.length?<Order order = {created_order} ></Order>:null}
        <br/>
        <br/>
        <div className="order-btn" onClick = {this.showConfirm.bind(this)}>
          付款
        </div>
        <Drawer show={this.state.showConfirm} pos='bottom' onRequestClose={this.hideConfirm.bind(this)}>
          <DrawerContent>
            <p>请确认您的以下信息准确无误后点击确认付款</p>
            <p> 姓名： <b>{this.state.contact}</b></p>
              <p>联系方式（手机号）：<b>{this.state.phone}</b></p>
              <p>地址：<b>{this.state.address}</b></p>
            <p>注：姓名请务必实名</p>
            <p >   注：地址需要包含省份、市（区）、县（县级市）、乡镇、街道小区的详细信息，港澳台及海外地区暂不支持配送 </p>

            <p >   注：如果因为信息填写不完整导致配送出现问题，后果自负！ </p>
          <ConfirmButtons onConfirm={this.handlePurchase.bind(this)} onCancel={this.hideConfirm.bind(this)}>
          </ConfirmButtons>
          </DrawerContent>
        </Drawer>
        <Toast
          autoHide
          show={this.state.warning}
          message="填写信息不完整"
        />
      </div>
    );
  }
}
