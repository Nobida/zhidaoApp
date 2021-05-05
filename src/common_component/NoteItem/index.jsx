import React from 'react';
import Avatar from '../Avatar';
import Icon from "../Icon";
import { heart, heart_solid, trash } from '../../svg';
import { getLocalTime } from '../../utils';

export default class NoteItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { type, avatar, nickname, time, content, quote, own, showFavor } = this.props;
    const localTime = getLocalTime(time, 8);
    return (
      <div className={type=="post"?"post-item":type=="question"?"question-item":"note-item"}>
        <Avatar size="md" src={ avatar }/>
        <div className={type=="post"?"post-content":type=="question"?"question-content":"note-content"}>
          <div className="head">
            <div className="nickname">
              { nickname }
            </div>
            <div className="time">
              { localTime }
            </div>
          </div>
          <div className="content">
            { content }
          </div>
          {quote ? (
            <div className="quote">
              { quote }
            </div>
          ) : null}
          <div className="bottom-tool">
            {own ? (
              <Icon
                icon={trash}
                size="sm"
                className="trash"
                onClick={this.props.onDeleteClick}/>
            ):null}
            {showFavor ? (
              <Icon
                icon={this.props.rated?heart_solid:heart}
                size="sm"
                className="heart"
                onClick={this.props.onToggleFavor}/>
            ):null}
          </div>
        </div>
      </div>
    );
  }
}
