import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '../../common_component/Avatar';
import './style.scss';
import Button from "../../common_component/Button/index";
import {SelectionContainer,SelectionItem} from '../../common_component/Selection';
import {DrawerContent,Drawer} from "../../common_component/Drawer/index";
import {PanelSelectionContainer,PanelSelectionItem} from "../../common_component/PanelSelection/index";
import Switch from '../../common_component/Switch';
export default class AlertSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showHourDrawer: false,
      showMinuteDrawer: false,
      switchChecked: false,
      cur_hour: 11,
      cur_minute: 30
    }
  }

  componentDidMount(){
    const {actions,user_id} = this.props;
    actions.fetchAlertSetting(user_id);
    $(window).scrollTo(0);
  }

  showHourDrawer(){
    this.setState({showHourDrawer:true});
  }
  hideHourDrawer(){
    this.setState({showHourDrawer:false});
  }

  showMinuteDrawer(){
    this.setState({showMinuteDrawer:true});
  }
  hideMinuteDrawer(){
    this.setState({showMinuteDrawer:false});
  }
  handleHourItemClick(i){
    this.setState({cur_hour: i, showHourDrawer:false})
  }
  handleMinuteItemClick(i){
    this.setState({cur_minute: i*30, showMinuteDrawer:false})
  }
  componentDidUpdate(){
    let timeCircleItem = ReactDOM.findDOMNode(this.refs.timeCircle);
    const {cur_hour,cur_minute} = this.state;
    const deg = cur_hour*30 + cur_minute*0.5;
    $(timeCircleItem).css('transform','rotate('+deg+'deg)');
  }
  handleSwitchChange(){
    this.setState({switchChecked: !this.state.switchChecked});
  }
  render(){
    const hourItems = [];
    for(let i=0;i<24;i++){
     hourItems.push(
       <PanelSelectionItem>{i}</PanelSelectionItem>
     )
    }
    return (
     <div className="alert-setting">
       <div className="alert-switch-item">
         <div className="alert-switch-item-content">
            <span>开启提醒</span>
            <Switch onChange={this.handleSwitchChange.bind(this)} checked={this.state.switchChecked}/>
         </div>
       </div>
       <br/>
       <br/>
       <p className="text-muted">点击时间选择提醒时间段</p>
       <div className="time-container">
         <img className="time-circle" src="./img/time_circle.svg" ref="timeCircle"/>
         <div className="time-text">
           <span className="hour" onClick={this.showHourDrawer.bind(this)}>{this.state.cur_hour}</span>
           <span className="colon">:</span>
           <span className="minute" onClick={this.showMinuteDrawer.bind(this)}>{this.state.cur_minute}</span>
         </div>
       </div>
       <Drawer show={this.state.showHourDrawer} pos="bottom" onRequestClose={this.hideHourDrawer.bind(this)}>
         <div className="drawer-scroll">
           <PanelSelectionContainer  activeItem={this.state.cur_hour} handleIndexChange={this.handleHourItemClick.bind(this)} >
             {hourItems}
           </PanelSelectionContainer>
         </div>
       </Drawer>
       <Drawer show={this.state.showMinuteDrawer} pos="bottom" onRequestClose={this.hideMinuteDrawer.bind(this)}>
         <PanelSelectionContainer activeItem={this.state.cur_minute}  handleIndexChange={this.handleMinuteItemClick.bind(this)}>
             <PanelSelectionItem>00</PanelSelectionItem>
             <PanelSelectionItem>30</PanelSelectionItem>

           </PanelSelectionContainer>
       </Drawer>
       <Button>提交修改</Button>

     </div>
    );
  }
}
