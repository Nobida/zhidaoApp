//== Calendar
//

import React from 'react';
import ReactDOM from 'react-dom';

// CalendarDayItem

class CalendarDayItem extends React.Component {
  constructor(props) {
    super(props);
  }

  getStatusClassName(){
      switch(this.props.data.status){
          case 'finished':
              return 'finished';
          case 'not_finished':
              return 'not_finished';
          case 'late':
              return 'late';
          case 'not_come':
              return 'not_come';
          default:
              return '';
      }
  }

  // Handle day item click
  handleItemClick(){
      if(this.props.handleItemClick){
          this.props.handleItemClick(this.props.data);
      }
  }
  render() {

    let className = this.props.data.selected?'selected':
      this.props.data.highlight?'highlight':'day';
    className+=" "+this.getStatusClassName();
    return (

        <td className={className}
            id={this.props.data.date}
            key={this.props.data.date}
            onClick={this.handleItemClick.bind(this)}>
            {new Date(this.props.data.date).getDate()}
        </td>
    );
  }
}

// CalendarMonthItem

class CalendarMonthItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

      // let monthItem = this.props.month;
        let year = this.props.year;
        let month = this.props.month;
        let days = this.props.days;
        let firstDay = (new Date(this.props.days[0].date).getDay())%7;
        let lineItems = [];
        let lines = [];
        // fulfill the first line
        for(let i=0;i<firstDay;i++){
            lineItems.push(<td className="day" key={year+month+i+'head'}> </td>);
        }
        for(let i=0;i<days.length;i++){
            if(lineItems.length == 7){
                lines.push(
                    <tr key={year+month+i+'tr'}>
                        {lineItems}
                    </tr>
                );
                lineItems = Object.assign([],[]);
            }

            lineItems.push(
                <CalendarDayItem
                                 data = {days[i]}
                                 key = {days[i].date}
                                 highlight={days[i].highlight}
                                 handleItemClick={this.props.handleItemClick}/>

            )
        }
        // fulfill the last line
        let tailLength = lineItems.length;
        for(let  i=0;i<7-tailLength;i++){
             lineItems.push(<td className="day" key={year+month+i+'tail'}> </td>);
        }

        lines.push(
            <tr key={year+month+'tailtr'}>
                {lineItems}
            </tr>
         );

        return (
            <div className="clndr" id={this.props.year+'-'+(this.props.month+1)}>
                <div className="month">{this.props.year+'/'+(this.props.month+1)}</div>
                <table className="clndr-table">
                    <tbody>
                    {lines}
                    </tbody>
                </table>
            </div>
        );
    }
}

const formatDate = function (date,year=true) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    if(year)
      return y + '-' + m + '-' + d;
    else{
      return  m + '-' + d;
    }
};
// Calendar Container

const scrollToAnchor = (anchorDate)=>{
     if(anchorDate) {
         let date = new Date(anchorDate);
         if($('#' + anchorDate).offset()){
           let offsetTop = $('#' + anchorDate).offset().top;
           if(offsetTop>window.scrollHeight-300){
              //console.log($(window).height)
              $(window).scrollTo(window.scrollHeight, 500);
           }
           else if(offsetTop > 300) {
             $(window).scrollTo(offsetTop-200, 500);
           }else{
             $(window).scrollTo(0, 500);
           }
         }

     }
  };
class Canlendar extends React.Component {
  constructor(props) {
    super(props);
  }
  // Split Month Data
  getMonthData(){
      let days = this.props.days;
      let monthDatas = [];
      let sDate = new Date(days[0].date);
      let eDate = new Date(days[days.length-1].date);
      let sYear = sDate.getFullYear();
      let sMonth = sDate.getMonth();
      let sDay = sDate.getDate();
      let eYear = eDate.getFullYear();
      let eMonth = eDate.getMonth();
      let eDay = eDate.getDate();
      let curMonth = sMonth;
      let curYear = sYear;
      let monthData = {'year':sYear,'month':sMonth,'days':[]};
      console.log('sDay');
      console.log(sDate);
      console.log(sDay);
      if(sDay!=1){
        for(let i=1;i<sDay;i++){
          let date = new Date(sYear,sMonth,i);
          monthData['days'].push({date:formatDate(date)});
        }
      }
      for(let i=0;i<days.length;i++){
          let date = new Date(days[i].date);
          let month = date.getMonth();
          let year =  date.getFullYear();
          if(month != curMonth){
              monthDatas.push(monthData);
              curMonth = month;
              curYear = year;
              monthData = Object.assign({},{'year':curYear,'month':month,'days':[]});
          }
          monthData['days'].push(days[i])
      }
      let mDay = new Date(eYear,eMonth,0).getDate();
      if(eDay < mDay){
        for(let i=eDay+1;i<=mDay;i++){
          let date = new Date(eYear,eMonth,i);
          monthData['days'].push({date:formatDate(date)});
        }
      }
      monthDatas.push(monthData);
      return monthDatas;
  }

  componentWillReceiveProps(nextProps){
      if(this.props.anchorDate != nextProps.anchorDate)
          scrollToAnchor(nextProps.anchorDate)
  }
  componentDidMount(){
      scrollToAnchor(this.props.anchorDate);
  }
  getMonthItems(){
      let monthDatas = this.getMonthData();
      let monthItems = [];
      for(let i=0;i<monthDatas.length;i++){
          monthItems.push(
              <CalendarMonthItem
                  days = {monthDatas[i].days}
                  year = {monthDatas[i].year}
                  month = {monthDatas[i].month}
                  key = {monthDatas[i].year+monthDatas[i].month}
                  handleItemClick = {this.props.handleItemClick}
                  kay = {i}
              />
          )
      }
      return monthItems;
  }
  render() {
    let monthItems = this.getMonthItems();
    return (
        <div>
             <div className="clndr-head">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <div className="clndr-container" ref="calendarContainer">
                {monthItems}
            </div>

        </div>
    );
  }
}
export {CalendarDayItem,Canlendar};


