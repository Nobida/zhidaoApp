import React from 'react';
import Avatar from '../../../common_component/Avatar';

export default class QuestionFavor extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="question-favor">
        <div className="avatars">
          { this.props.latest_ratings.map(item => (
            <Avatar size="sm" key={item.user} src={item.avatar}/>
          ))}
        </div>
        <div className="favor-info">
          {this.props.rating} 人赞
        </div>
      </div>
    )
  }
}
