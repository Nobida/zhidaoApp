import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import Button from '../../common_component/Button';
import {BookPage} from "../../common_component/BookPage/index";
import {Link} from 'react-router-dom';
import {getCourseCategoryName} from "../../utils/lesson_helper";
import { BASIC_URL, INTRO_URL, FOLLOW_URL,ORDER_URL } from "../../api/const";
import Card from '../../common_component/Card';
import {ROOT_URL,MAIN_URL} from "../../api/const";
import {getUrlParam,getParamStr} from "../../utils/path_helper";
import Toast from '../../common_component/Toast';
import './style.scss';
import {checkProbationPath} from '../../utils/path_helper'

class AdFooter extends React.Component {
  constructor(props) {
   super(props);
  }
  render(){
    const {hasProbation,course_id} = this.props
    return (
      <div className='ad-footer'>
        <div className='price-info'>
          <div className='cur-price'>￥{this.props.price-this.props.discount}</div>
          {this.props.discount>0 && <div className='origin-price'>原价{this.props.price}元</div>}
        </div>
        {!this.props.enrolled ? 
          (this.props.progress=='ended' ? 
          <Button className='buy-btn' >课程已结束</Button>:
          hasProbation?(<div className='buy-container'>  
            <Link to={'/probation-list/'+course_id}><Button className='buy-btn-sm' type='primary'>试读</Button></Link>
            <Button className='buy-btn-sm' onClick={this.props.onBuyBtnClick}>购买</Button>
            </div>):(<Button className='buy-btn'  onClick={this.props.onBuyBtnClick}>购买</Button>)): 
          <Button className='buy-btn' >您已购买</Button>}
      </div> 
    )
  }
}

class AdFooterItem extends React.Component{
  constructor(props) {
   super(props);
  }
  handleClick(){
    if(this.props.products && this.props.onClick){
      this.props.onClick(this.props.products,this.props.has_concrete);
    }
  }
  render() {

    return (
      <div className='footer-item'>
        <Button onClick={this.handleClick.bind(this)}>
          <div>
          {this.props.name} 
            {this.props.discount ? (<span className='origin-price'>{this.props.price}</span>):null}
            <span className='price'>{this.props.discount?this.props.price-this.props.discount:this.props.price}</span>
          </div>
        </Button>
      </div>
    )
  }
}

class AdFooterMultiple extends React.Component {
  constructor(props) {
   super(props);
  }
  render(){
    const o = this;
    const invitation_code = getUrlParam('invitation_code')
    console.log('invitation code')
    console.log(invitation_code)
    const buttons = this.props.products.map(function(d,i){
      return (
        <AdFooterItem key={i}
                      name={d.name} price={d.price}
                      discount={(d.discount?d.discount:0) + (invitation_code? o.props.invitation_discount:0)}
                      products={d.products}
                      has_concrete={d.has_concrete}
                      onClick={o.props.onItemClick}/>
      )
    })
    return (
      <div>
        {invitation_code && this.props.invitation_discount ? (<div className='discount-info'>受邀专享优惠 <span className='price'>{this.props.invitation_discount}</span></div>):null }
        <div className='ad-footer'>
          {buttons}
        </div>
      </div>
    )
  }
}



class AdHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='ad-header'>
        <Card bg={this.props.picture?ROOT_URL+this.props.picture:'http://upload.art.ifeng.com/2015/0713/1436758083821.jpg'} >
          {this.props.category && <div className='label'>{getCourseCategoryName(this.props.category)}</div>}
          <div className='course-name'>{this.props.name}</div>
          <div className='desc'>{this.props.desc?this.props.desc.split('/')[0]:''}</div>
        </Card>
        <div className='info-box'>
          <div className='item'>
            <div>开课时间</div>
            <div className='time'>{this.props.begDate}</div>
          </div>
          <div className='item'>
            <div>结课时间</div>
            <div className='time'>{this.props.endDate}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default class AdPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {showToast: false, toastMsg:'您已经报名课程', has_concrete:false}
  }

  componentDidMount(){
    const {course_id} = this.props;
    const {actions} = this.props;

    actions.fetchCourseByID(course_id);
    actions.checkDiscountByProduct(course_id);
    actions.fetchCourseProducts(course_id);
  }

  componentWillReceiveProps(nextProps){
    const {user,cur_course,actions} = nextProps
    const apikey = user.apikey
    const pre_course = this.props.cur_course;
    const item_order = nextProps.item_order.item_order;
    const pre_item_order = this.props.item_order.item_order;
    const pre_product_order = this.props.product_order;

    const collecting_products = nextProps.item_order.collecting_products
    const pre_collecting_products = this.props.item_order.collecting_products
    const collect_order = nextProps.item_order.collect_order_ret


    if(!collecting_products && pre_collecting_products){
      console.log(this.props);
      console.log(nextProps);
      let redirect_url = MAIN_URL + '#/user-guide/' + cur_course.course.uuid;
      if(cur_course.course.category=='dl'){
        redirect_url = MAIN_URL+'#/main/home/daily-reading/'+cur_course.course.uuid;
      }
      if(this.state.has_concrete){
       const {history} = this.props;
       history.push('/created-orders/'+collect_order.id+'/cash/'+encodeURIComponent(redirect_url)+ getParamStr('?')) ;
      }else {
        window.location.href = ORDER_URL + '?apikey=' + apikey + '&product_order=' + collect_order.id + '&redirect=' + encodeURIComponent(redirect_url) + getParamStr('&');
      }
    }
    if(cur_course.course.uuid != pre_course.course.uuid){
      actions.setAdSharePage();
    }
    if(!pre_item_order.id && item_order.id){

      let redirect_url = MAIN_URL + '#/user-guide/'+cur_course.course.uuid;
      if(cur_course.course.category=='dl'){
        redirect_url = MAIN_URL+'#/main/home/daily-reading/'+cur_course.course.uuid;
      }
      window.location.href = ORDER_URL + '?apikey='+apikey+'&product_order='+item_order.id + '&redirect='+encodeURIComponent(redirect_url) + getParamStr('&');
    }
  }

  componentWillUnmount(){
    const {actions} = this.props;
    actions.setDefaultSharePage();
  }

  handleBuyBtnClick() {
    const {course_id} = this.props;
    const {actions} = this.props;
    const {cur_course} = this.props;
    if(!cur_course.course.enrolled) {
      actions.purchaseImmediately(course_id);
    }else{
      this.showToast()
    }
  }
  handleBuyItem(products,has_concrete){
    const {actions,cur_course} = this.props;
    console.log(products);
    console.log(products);

    if(!cur_course.course.enrolled){
      this.setState({has_concrete: has_concrete})
      actions.buyProducts(products);
      //this.showToast('暂时无法购买');

    }else{
     // actions.buyProducts(products);
      this.showToast('您已经购买课程')
    }
  }
  showToast(msg){
    this.setState({showToast:true,toastMsg:msg})
    setTimeout(()=>{
      this.setState({showToast:false})
    },1000)
  }

  render() {
    const {course,fetching_course,course_products} = this.props.cur_course;
    const {discount_info} = this.props.cur_product_discount;
    
    const discount = discount_info && discount_info.discount? discount_info.discount:0;
    const public_lessons = course.public_lessons;
    const detailHtml = course.detail?{html: course.detail}:null;
    
    const hasProbation = public_lessons&&public_lessons.length



    return ( 
      !fetching_course ?
      ( <div className='ad-page'>
          <AdHeader begDate={course.begdt} endDate={course.enddt} name={course.name} category={course.category} picture={course.picture} desc={course.desc}/>
          {detailHtml && <BookPage content={detailHtml}></BookPage>}
          {course_products && course_products.length?
            <AdFooterMultiple products={course_products} onItemClick={this.handleBuyItem.bind(this)} invitation_discount={course.invitation_discount}/>:
            (<AdFooter 
              hasProbation={hasProbation}
              course_id = {course.uuid}
              discount={discount} price={course.price} onBuyBtnClick={this.handleBuyBtnClick.bind(this)} enrolled={course.enrolled} progress={course.computed_status?course.computed_status.progress:''}/>)}
            <Toast message={this.state.toastMsg} show={this.state.showToast}/>
           
        </div>  
      ): <Loadings/>
    )
  }
}

// export class AdPageContainer extends React.Component {
//   constructor(){

//   }

// }