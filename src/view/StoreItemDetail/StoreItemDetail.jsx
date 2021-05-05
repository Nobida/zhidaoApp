import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../../common_component/Button';
import Toast from '../../common_component/Toast';
import { BookPage } from '../../common_component/BookPage';
import { Link } from 'react-router-dom';
import './style.scss';


export default class StoreItemDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showToast: false,
      toastMsg: '',
      toastStatus: '',
      isPurchase: false,
    }
  }



  addToCart(){
    const { actions } = this.props;
    console.log(this.props.cur_product.cur_product.uuid);
    actions.addProduceIntoCarts({uuid: this.props.cur_product.cur_product.uuid});
  }

  updateDetailItem(detail){
    let item = ReactDOM.findDOMNode(this.refs.detail);
    $(item).html(detail);
  }

  purchaseItemById(){
    console.log("in pruchase item by id");
    const { actions } = this.props;

    actions.addProduceIntoCarts({uuid: this.props.cur_product.cur_product.uuid});
    this.setState({
      isPurchase:true,
    })
  }

  componentDidMount(){
    console.log('BookDetail did mount');
    const { actions } = this.props;
    const productID = this.props.match.params.id;

    actions.fetchProductDetail(productID);


  }

  componentWillReceiveProps(nextProps){
    console.log('in componentWillReceiveProps');
    const{ add_success} = nextProps;
    if(!this.props.add_success&& add_success && !this.state.isPurchase)
    {
      this.setState({
        showToast: true,
        toastMsg: '已加入购物车',
        toastStatus: 'success',
      });
      let o = this;
      setTimeout(function(){
        o.setState({
        showToast: false,
      })}, 3000);
      return;
    }
    this.updateDetailItem(nextProps.cur_product.cur_product.detail);
    const{add_ret} = this.props;

    if(JSON.stringify(add_ret) == "{}"&& JSON.stringify(nextProps.add_ret) != "{}" && this.state.isPurchase){
      console.log('put item into order');
      this.props.actions.purchaseById(nextProps.add_ret.id);
      return;
    }
    const {item_order} = this.props;
    if(item_order.items == null && nextProps.item_order.items != null)
        {
          window.location.href='#/created-orders/'+nextProps.item_order.id;
        }
  }

  render(){
    console.log('BookDetail render');
    console.log(this.props)

    const {cur_product} = this.props.cur_product;
    const {detail} = this.props.cur_product.cur_product;
    const detailHtml = detail?{html: detail}:null;
    console.log(detail)

    return(
      <div className="store-item-detail">
          <BookPage content={detailHtml}>
          </BookPage>
          <div className="button-tools">
            <div onClick={this.addToCart.bind(this)} className="add-cart-btn">加入购物车</div>
            <div onClick={this.purchaseItemById.bind(this)} className="purchase-btn">立即购买</div>
          </div>

          <Toast
            show={this.state.showToast}
            message={this.state.toastMsg}
            status={this.state.toastStatus}
            autoHide
          />

      </div>
    )
  }
}
