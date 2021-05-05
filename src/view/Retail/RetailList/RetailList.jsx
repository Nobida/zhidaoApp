import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss'; 
import RetailOrderItem from '../RetailOrderItem'
import {TagSwitchContainer, TagItem} from '../../../common_component/TagSwitch'; 


export default class Retail extends React.Component {
  constructor(props) {
    super(props);

  } 

  componentDidMount() {
    const {actions, match} = this.props;
    actions.fetchRetailOrderItem()


  }
  handleNavIndexChange(i,value){
    const {actions, history} = this.props;
    this.setState({navValue: value})
    history.replace('/retail/retail-list/'+value); 
  }


  render() {
    
    const { personal_credit_info, order_item_list, history } = this.props
    const paths = this.props.location.pathname.split('/');
    const settledPaidItem = order_item_list.filter((d) => {return d.paid===true});
    const waitingPaidItem = order_item_list.filter((d) =>{return d.paid===false && d.valid===true});
    const invalidPaidItem = order_item_list.filter((d) =>{return d.valid===false});



    const waitingPaidItemList = waitingPaidItem.map(function(d,i){
      return(
       <RetailOrderItem
          key={i}
          course={d.course}
          student={d.student}
          create_dt={d.create_dt}
          credit={d.credit}
          course_price={d.course_price}
          course_picture={d.course_picture}
          status="待结算"
          history={history}
        />
      )
    });

    const settledPaidItemList = settledPaidItem.map(function(d,i){
      return(
       <RetailOrderItem
          key={i}
          course={d.course}
          student={d.student}
          create_dt={d.create_dt}
          credit={d.credit}
          course_price={d.course_price}
          course_picture={d.course_picture}
          status="已结算"
          history={history}
        />
      )
    });
  
    const invalidPaidItemList = invalidPaidItem.map(function(d,i){
      return(
       <RetailOrderItem
          key={i}
          course={d.course}
          student={d.student}
          create_dt={d.create_dt}
          credit={d.credit}
          course_price={d.course_price}
          course_picture={d.course_picture}
          status="已失效"
          history={history}
        />
      )
    });

    return ( 
      <div className="retail-list">
          <TagSwitchContainer handleIndexChange={this.handleNavIndexChange.bind(this)}>
                <TagItem value='all'>全部订单</TagItem>
                <TagItem value='waiting'>待结算</TagItem>
                <TagItem value='settled'>已结算</TagItem>
                <TagItem value='invalid'>无效订单</TagItem>
            </TagSwitchContainer> 
            <div className='content' >
                {paths[paths.length-1]==='retail-list'?([waitingPaidItemList,settledPaidItemList,invalidPaidItemList]):''}
                {paths[paths.length-1]==='all'?([waitingPaidItemList,settledPaidItemList,invalidPaidItemList]):''}
                {paths[paths.length-1]==='waiting'?(waitingPaidItemList):''}
                {paths[paths.length-1]==='settled'?(settledPaidItemList):''}
                {paths[paths.length-1]==='invalid'?(invalidPaidItemList):''}
            </div>   
      </div>
    );
  }
}
