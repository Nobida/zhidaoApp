import React from 'react';
import Avatar from '../../Avatar';
import Icon from "../../Icon";
import { heart, heart_solid, trash } from '../../../svg';
import {Link} from 'react-router-dom';
import { getLocalTime } from '../../../utils';

export default class PostListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { id, resource, avatar, nickname, time, title, contents, quote, own, typeTags, rated } = this.props.data;
    //const localTime = getLocalTime(time, 8);
    const tags = typeTags&&typeTags.length?typeTags.map(function(d,i){
      return (
        <div className="tag-item">
          {d}
        </div>
      )
    }):null;
    return (
      <div className="post-list-item">
          <div className="item-head">
                <div className="user-info">
                    <Avatar className="avatar" size="sm" src={avatar}/>
                    <div className="nickname">{nickname}</div>
                </div>
                <div className="time">
                    {time}
                </div>
            </div>
          <div className="title">
             { title }
          </div>
          <div className="content">
            <Link to={"/"+resource+"/" + id}>
                <p className="desc">
                    {contents}
                </p>
              </Link>
          </div>
          {quote ? (
            <div className="quote">
              { quote }
            </div>
          ) : null}
          <div className="bottom-tool">
            <div className="tags">
              {tags}
            </div>
            {own ? (
              <Icon
                icon={trash}
                size="sm"
                className="trash"
                onClick={this.props.onDeleteClick}/>
            ):null}
              <Icon
                icon={rated?heart_solid:heart}
                size="sm"
                className="heart"
                onClick={this.props.onToggleFavor}/>
          </div>
      </div>
    );
  }
}
