import React from 'react';
import PropTypes from 'prop-types'
import {ROOT_URL} from "../../../api/const";

export default class PageCardHeader extends React.Component {

  render(){
    const {cardName, lessonName, cardCount, curCardNum,cardBanner,dayNum} = this.props;
    const headerWithBanner = (
      <div className='page-card-header-with-banner'>
        <div className='banner'>
          <img src={ROOT_URL+cardBanner}/>
        </div>
        <div className='content'>
          <div className='lesson-info'>
            <span className='day'>{'DAY'+dayNum}</span>
            <span>{lessonName}</span>
          </div>
          <div className='card-name'>
            {cardName}
          </div>
          <div className='progress'>
            {curCardNum+'/'+cardCount}
          </div>
        </div>
      </div>
    )
    const headerNormal = (
      <div className='page-card-header-normal'>
        <div className='card-name'>
          {cardName}
        </div>
        <div className='info'>
          <div className='day'>
            {'DAY'+dayNum}
          </div>
          <div className='line'/>
          <div className='progress'>
            {curCardNum+'/'+cardCount}
          </div>
        </div>
      </div>
    )
    return cardBanner?headerWithBanner:headerNormal;
  }
}
PageCardHeader.propTypes = {
  cardName: PropTypes.string,
  cardBanner: PropTypes.string,
  lessonName: PropTypes.string,
  cardCount: PropTypes.number,
  curCardNum: PropTypes.number,
  dayNum: PropTypes.number
}