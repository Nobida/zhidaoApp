import React from 'react';
import Button from '../../../common_component/Button'

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.filterList = [{
    //   value: 'all',
    //   label: '全部'
    // }, {
      value: 'question',
      label: '问答'
    }, {
      value: 'media',
      label: '资源'
    }, {
      value: 'note',
      label: '笔记'
    }, {
      value: 'post',
      label: '其他'
    }]
  }
  render() {
    console.log('Filters render')
    const { select } = this.props;
    return (
      <div className="round-table-filters">
        {this.filterList.map(item => (
          <div
            key={item.value}
            onClick={()=>this.props.onFilterChanged(item.value)}
            className={select === item.value ? "filter-btn active" : "filter-btn"}
          >{item.label}</div>
        ))}
      </div>
    );
  }
}
