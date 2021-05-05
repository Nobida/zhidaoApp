import React from 'react';
import { Link } from 'react-router-dom';
import Order from '../../common_component/Order';
import Button from '../../common_component/Button';
import { LabelTabContainer, LabelTabItem } from "../../common_component/LabelTabs";
import Toast from '../../common_component/Toast';
import { Drawer, DrawerContent } from "../../common_component/Drawer";
import ConfirmButtons from "../../common_component/MediaItem/ConfirmButtons";
import "./style.scss";

const NO_DRAWER         =-1;
const SHOW_DRAWER       = 1;
const RECEIVED_DRAWER   = 2;
const DETAIL_DRAWER   = 3;


export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: NO_DRAWER,
      deleteID: 0,
      receivedOrderID: 0,
      status: 'payed',
      showToast: false,
      toastMsg: '',
      toastStatus: '',
      orderInfo:{
        contact: "",
        phone: "",
        address:"",
        delivery_order: "",
      }
    }
  }

  handleIndexChange(i){
    let status = '';
    const{ actions} = this.props;
    switch (i){
      case 0:
        status = 'payed';
        break;
      case 1:
        status = 'created';
        break;
      default:
        status = ' ';
        break;
    }
    this.setState({
      status: status
    })
    actions.getOrderList(status);
  }

  deleteOrder(orderID){
    const { actions } = this.props;
    console.log('in delete');
    actions.deleteAnOrder(orderID);
    this.setState({
      showDrawer: false,
    })
  }

  handleDelete(deleteID){
    this.setState({
      showDrawer: SHOW_DRAWER,
      deleteID: deleteID})
  }

  handleReceived(orderID){
    this.setState({
      showDrawer: RECEIVED_DRAWER,
      receivedOrderID: orderID})
  }

  handleDetail(contact, phone, address, delivery_order, id){
    const { history } = this.props;
    history.replace('/order-detail/'+id);
    console.log('in handleDetail');
    let orderInfo = {
      contact: contact,
      phone: phone,
      address: address,
      delivery_order: delivery_order,
    }
    this.setState({
      orderInfo: orderInfo,
      showDrawer: DETAIL_DRAWER,})
  }


  receivedOrder(orderID){
    const { actions } = this.props;
    console.log('in received order');
    actions.confirmOrderReceived(orderID);
    this.setState({
      showDrawer: NO_DRAWER,
    })
  }

  drawerHide(){
    this.setState({
      showDrawer: NO_DRAWER,})
  }

  componentDidMount(){
    console.log('order list did mount');
    const{ actions} = this.props;
    actions.getOrderList('payed');
  }

  componentWillReceiveProps(nextProps){
    const{ delete_success} = this.props;
    let o = this;
    if(!delete_success && nextProps.delete_success)
    {
      const { actions } = this.props;
      actions.getOrderList(this.state.status);
      this.setState({
        showToast: true,
        toastMsg: '订单已删除',
        toastStatus: 'success',
      })
      setTimeout(function(){
        o.setState({
        showToast: false,
      })}, 3000);
      return;
    }
  }



  render() {
    console.log('order list render');
    const {orderlist} = this.props;
    console.log(orderlist)
    const o = this;
    return (
      <div className="order-list">
        <LabelTabContainer className="fixed-head" handleIndexChange={this.handleIndexChange.bind(this)}>
          <LabelTabItem>已付款</LabelTabItem>
          <LabelTabItem>未付款</LabelTabItem>
        </LabelTabContainer>
        { orderlist&&orderlist.length?orderlist.map(function(d,i){
          return (
            d.status==o.state.status?
            <div key = {d.id}>
                <Order order = {d}></Order>
                {d.status=='created'?(
                  <div className="confirm-buttons">
                     <Link to={'/created-orders/'+d.id}><Button size="sm">支付</Button></Link>
                    <Button onClick={o.handleDelete.bind(o, d.id)}  size="sm">删除</Button>
                  </div>):
                  (<div className="confirm-buttons">
                      <Link to={'/order-detail/'+d.id}>
                        <Button size="sm">订单详情</Button>
                      </Link>
                      {d.sent == true && d.received == false?<Button onClick={o.handleReceived.bind(o, d.id)}  size="sm">确认收货</Button>:null}
                    </div>)
                }

            </div>:null
          )
        }):null}


        <Drawer
          show={this.state.showDrawer == SHOW_DRAWER}
          hideOverlay={true}
          pos="bottom">
          <div className="delete-content">
            <div className="drawer-content"><p>确定要删除吗？</p></div>
            <div className="button-tools">
              <ConfirmButtons
                onConfirm = {this.deleteOrder.bind(this, this.state.deleteID)}
                onCancel = {this.drawerHide.bind(this)}>
              </ConfirmButtons>
            </div>
          </div>
        </Drawer>
        <Drawer
          show={this.state.showDrawer == RECEIVED_DRAWER}
          hideOverlay={true}
          pos="bottom">
          <div className="delete-content">
            <div className="drawer-content"><p>确定已收货吗？</p></div>
            <div className="button-tools">
              <ConfirmButtons
                onConfirm = {this.receivedOrder.bind(this, this.state.receivedOrderID)}
                onCancel = {this.drawerHide.bind(this)}>
              </ConfirmButtons>
            </div>
          </div>
        </Drawer>
        <Drawer
          show={this.state.showDrawer == DETAIL_DRAWER}
          hideOverlay={true}
          showClose
          onRequestClose={this.drawerHide.bind(this)}
          pos="bottom">
          <div>
            <div className = "detail-content">
              <div><b>收货人姓名</b>: {this.state.orderInfo.contact}</div>
              <div><b>收货人电话</b>: {this.state.orderInfo.phone}</div>
              <div><b>收货地址</b>: {this.state.orderInfo.address}</div>
              {this.state.orderInfo.delivery_order != ""?<div><b>订单号</b>: {this.state.orderInfo.delivery_order}</div>:null}
            </div>
          </div>
        </Drawer>
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
