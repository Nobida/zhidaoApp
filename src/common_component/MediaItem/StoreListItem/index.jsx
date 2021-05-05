import React from 'react';
import Button from '../../Button';
import {Link} from 'react-router-dom';

export default class StoreListItem extends React.Component {

  constructor(props){
      super(props);
  }
  render() {
    return(
        <Link to={"/store-item-detail/"+ this.props.uuid}>
          <div className="store-list-item">
              <div className="thumbnail">
                  <img src={this.props.img}/>
              </div>
              <div className="item-info">
                <div className="name">
                  {this.props.name}
                </div>
                <div className="score-info">
                    <span>{this.props.use_score?'积分':'价格'}</span>
                    <span className="score">{this.props.use_score?(this.props.score):(this.props.price + '元')}</span>
                </div>
              </div>
          </div>
        </Link>
    )
  }
}
