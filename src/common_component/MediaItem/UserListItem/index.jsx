import React from 'react';
import Avatar from '../../Avatar';
import Button from '../../Button';
export default class UserListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { avatar, nickname, intro, follow } = this.props;
    //const localTime = getLocalTime(time, 8);

    return (
      <div className="user-list-item">
        <div className="left">
          <Avatar src={avatar} size="bg"/>
          <div className="info">
            <div className="nickname">{nickname}</div>
            <div className="intro">{intro}</div>
          </div>
        </div>
        {follow?(
          <Button className="follow-button" size='sm'>已关注</Button>
        ):<Button className="follow-button" size='sm' type="ghost">+ 关注</Button>}
      </div>
    );
  }
}
