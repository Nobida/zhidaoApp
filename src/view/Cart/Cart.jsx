import React from 'react';
import { Link } from 'react-router-dom';
import StoreListItem from '../../common_component/MediaItem/StoreListItem';
import Button from '../../common_component/Button';
import Toast from '../../common_component/Toast';
import { Drawer, DrawerContent } from "../../common_component/Drawer";
import ConfirmButtons from "../../common_component/MediaItem/ConfirmButtons";

import "./style.scss";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      deleteID: 0,
      sumscore : 0,
      showToast: false,
      toastMsg: '',
      toastStatus: '',
    }
  }

  deleteFromCart(itemID){
    const { actions } = this.props;
    console.log('in delete');
    actions.deleteProductFromCart(itemID);
    this.setState({
      showDrawer: false,
    })
  }

  purchase()
  {
    const {carts, actions} = this.props;
    if(carts&&carts.length)
    {
      console.log('in purchase');
      actions.colletOrder();
    }
  }

  componentDidMount(){
    const { actions } = this.props;
    actions.fetchCarts();
  }

  componentWillReceiveProps(nextProps){
    let sumscore = this.getSumScore(nextProps);
    const{ deleting_item, collect_order_ret} = this.props;
    console.log('asfdasdfasd');
    console.log(deleting_item);
    console.log(nextProps.delete_success);
    if(deleting_item && nextProps.delete_success)
    {
      const { actions } = this.props;
      actions.fetchCarts();
      this.setState({
        showToast: true,
        toastMsg: '已从购物车删除',
        toastStatus: 'success',
      })
      let o = this;
      setTimeout(function(){
        o.setState({
        showToast: false,
      })}, 3000);
      return;
    }
    this.setState({sumscore: sumscore});
    if(collect_order_ret.items == null && nextProps.collect_order_ret.collect_order_ret.items != null)
    {
      window.location.href='#/created-orders/'+nextProps.collect_order_ret.collect_order_ret.id;
    }
  }

  getSumScore(nextProps)
  {
    console.log('in getSumScore');
    console.log(nextProps);
    let sum = 0;
    for(let i = 0; i < nextProps.carts.length; i++)
    {
      sum += nextProps.carts[i].score;
    }

    return sum;
  }

  handleDelete(deleteID){
    this.setState({
      showDrawer: true,
      deleteID: deleteID})

  }

  drawerHide(){
    this.setState({
      showDrawer: false,})
  }

  render() {
    console.log(this.props);
    const {carts} = this.props;
    const o = this;
    return (
      <div className = "cart">
          { carts&&carts.length?carts.map(function(d,i){
            return (
              <div key = {d.id}>
                  <StoreListItem use_score name={d.name} uuid = {d.product} score={d.score} img={"./img/store/Postcard.jpg"}/>
                   <Button onClick={o.handleDelete.bind(o, d.id)} size = 'sm'>删除</Button>
              </div>
            )
          }):null}
          <div className="bottom-info">
            <div className = "sumscore">总金额：{this.state.sumscore}</div>
            <div onClick={this.purchase.bind(this)} className="purchase-btn">购买</div>
          </div>
            <Toast
              show={this.state.showToast}
              message={this.state.toastMsg}
              status={this.state.toastStatus}
              autoHide
            />
            <Drawer
              show={this.state.showDrawer}
              hideOverlay={true}
              pos="bottom">
              <div className="delete-content">
                <p>确定要删除吗</p>
                <div className="button-tools">
                  <ConfirmButtons
                    onConfirm = {this.deleteFromCart.bind(this, this.state.deleteID)}
                    onCancel = {this.drawerHide.bind(this)}>
                  </ConfirmButtons>
                </div>
              </div>
            </Drawer>
      </div>
    );
  }
}
