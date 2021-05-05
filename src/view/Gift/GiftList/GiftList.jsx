import React from 'react';
import {Drawer,DrawerContent} from '../../../common_component/Drawer';
import Button from '../../../common_component/Button';
import {MAIN_URL, ORDER_URL} from "../../../api/const";
import ConfirmButtons from '../../../common_component/MediaItem/ConfirmButtons';
import Loadings from '../../../common_component/Loadings';
import Toast from '../../../common_component/Toast';
class GiftItem extends React.Component{
  constructor(props) {
    super(props);
  }
  getStatusText(){
    const {status,is_usable} = this.props.data;
    if(status=='created' && !is_usable){
      return '未支付'
    }
    if(status=='created' && is_usable){
      return '未使用'
    }
    if(status=='received'){
      return '已使用'
    }
    return '未支付';
  }
   render(){
    const {to} = this.props.data;
    return (
      <div className='gift-item' onClick={this.props.onItemClick}>
        <div className="">
          To：{to}
        </div>
        <div className="status">
          {this.getStatusText()}
        </div>
      </div>
    );
  }

}

export default class GiftList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showDrawer:false,
      showDeleteDrawer:false,
      toastMsg:'',
      showToast: false,
      toastStatus: ''
    }
  }
  componentDidMount(){
    const {actions} = this.props;
    actions.fetchGiftList();
  }

  handleGiftItemClick(d){
    const {apikey,actions} = this.props;
    console.log(d);
    actions.setCurGift(d);
    this.setState({showDrawer:true});
      //window.location.href = '#/gift-img';
    //}
  }
  hideDrawer(){
    this.setState({showDrawer:false,showDeleteDrawer:false});
  }


  handleDeleteBtnClick(){
    this.setState({
      showDrawer: false,
      showDeleteDrawer: true
    })
  }

  handleDelete(){
    const {actions,cur_gift} = this.props;
    if(cur_gift.uuid)
      actions.deleteGift(cur_gift.uuid)
  }

  componentWillReceiveProps(nextProps){
    const {cur_delete_gift,actions} = nextProps;
    if(cur_delete_gift.deleting_gift){
      this.setState({
        showToast: true,
        toastMsg:'正在删除',
        toastStatus:'loading'
      })
    }
    if(cur_delete_gift.success_info && this.props.cur_delete_gift.deleting_gift){
      let o = this;
      this.setState({
        showDeleteDrawer:false,
        toastMsg:'删除成功',
        toastStatus:'finish'
      });
      actions.fetchGiftList();
      setTimeout(function () {
        o.setState({showToast:false})
      },1000)
    }
  }

  getButton(){
    const {cur_gift,apikey} = this.props;
    const {is_usable,status,uuid} = cur_gift;
    if(status == 'created' && !is_usable){
     let redirect_url = MAIN_URL+'#/gift-img/'+uuid;
    let orderUrl = ORDER_URL + '?apikey='+apikey+'&gift='+uuid+'&redirect='+encodeURIComponent(redirect_url);
     return(
       <div>
       <a href={orderUrl}>
          <Button >去支付</Button>
       </a>
       <Button type='ghost' onClick={this.handleDeleteBtnClick.bind(this)}>删除</Button>
       </div>
     )
    }else{
      return(
       <a href={"#/gift-img/"+cur_gift.uuid}>
          <Button >查看赠送</Button>
       </a>
     )
    }
  }
  render(){
    const gifts = this.props.gifts.gifts;
    const fetching_gifts = this.props.gifts.fetching_gifts;
    const {cur_gift} = this.props;
    let o = this;
    const giftList = gifts.map(function(d,i){
      return (
        <GiftItem key={i} data={d} onItemClick={o.handleGiftItemClick.bind(o,d)}/>
      )
    });
    const textItems = cur_gift.text?cur_gift.text.split('\n').map(function(d,i){
      <p>d</p>
    }):null;
    return (
      <div>
        {giftList}
        <Drawer
          show={this.state.showDrawer}
          showClose
          onRequestClose={this.hideDrawer.bind(this)}
          pos='bottom' >
          <DrawerContent>
            <h3>
              To:{cur_gift.to?cur_gift.to:''}
            </h3>
            {cur_gift.text}
            <div className="btn-groups">
              {this.getButton()}
            </div>
          </DrawerContent>
        </Drawer>
        <Drawer
          show={this.state.showDeleteDrawer}
          pos="bottom"
        >
          <DrawerContent>
            <p>确定要删除赠送给<b>{cur_gift.to}</b>的课程吗？</p>
          <ConfirmButtons onConfirm={this.handleDelete.bind(this)} onCancel={this.hideDrawer.bind(this)}/>
          </DrawerContent>
        </Drawer>
        <Toast
          show={this.state.showToast}
          message = {this.state.toastMsg}
          status={this.state.toastStatus}
        />
        <Loadings show={fetching_gifts}/>
      </div>
    );
  }
}
