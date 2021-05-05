//== NoteList

import React from 'react';
import Avatar from '../Avatar';
import {Link} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {trash,heart,heart_solid,comment,check,star} from "../../svg";
import Icon from "../Icon";
import { getLocalTime } from '../../utils';

class NoteListItem extends React.Component {

  constructor(props){
      super(props);
  }
  render() {
    const resource = this.props.resource ? this.props.resource : "note";
    const localTime = getLocalTime(this.props.create_dt, 8);
    const { roundTable } = this.props;
    return(
        <div className="note-list-item">
            <div className="item-head">
                <div className="user-info">
                    <Avatar className="avatar" size="sm" src={this.props.avatar}/>
                    <div className="nickname">{this.props.nickname}</div>
                </div>
                <div className="time">
                    {this.props.sticky?'【置顶】':null}
                    {localTime}
                </div>
            </div>

            <div className="content">
              <Link to={"/"+resource+"/" + (roundTable?(roundTable+'/'):'') + this.props.id}>
                <p className="desc">
                  {(!this.props.showFullContent&&(this.props.contents.length>40))?(this.props.contents.slice(0,40)+'...'):this.props.contents}
                </p>
              </Link>

              {this.props.selection && this.props.selection.contents?
                (<div className="quote" onClick={this.props.onQuoteClick?this.props.onQuoteClick:null}>
                    {(this.props.selection.contents.length>50)?(this.props.selection.contents.slice(0,50)+'...'):this.props.selection.contents}
                </div>):null}
                {this.props.source || this.props.lesson_name ? (
                  <div className="source-lesson-name">
                    <span>来自</span>
                    { this.props.source ? (' ' + this.props.source) : ''}
                    { this.props.lesson_name ? (' 《' + this.props.lesson_name) + '》' : ''}
                  </div>
                ) : null}
            </div>

            <div className="bottom-tool">
              <div className="left">
              {
                this.props.showVip ? (
                  <Link to={"/"+resource+"/" + this.props.id}>
                    <div className="check-vip">人文君已答</div>
                  </Link>
                ) : null
              }
              {
                this.props.isThinking ? (
                  <Link to={"/"+resource+"/" + this.props.id}>
                    <div className="check-vip">思考题</div>
                  </Link>
                ) : null
              }
              </div>
              <div className="right">
              {
                this.props.showCount ? [(
                  <Link to={"/"+resource+"/" + this.props.id} key="icon">
                    <Icon icon={comment} size="xs"/>
                  </Link>),
                  (<Link to={"/"+resource+"/" + this.props.id} key="counts">
                    <span>
                    {this.props.counts?this.props.counts:0}
                    </span>
                  </Link>)] : null
              }
              {
                this.props.showFavor ? [(
                  <Icon size="xs" icon={this.props.rated?heart_solid:heart} onClick={this.props.onRatingClick} key="icon" />),
                  (<span key="counts" >
                    {this.props.rating?this.props.rating:0}
                  </span>)] : null
              }
              {
                this.props.own ? (
                  <Icon icon={trash} size="xs" onClick={this.props.onDeleteClick?this.props.onDeleteClick:null}/>
                ) : null
              }
              {
                this.props.showComment ? [(
                  <Icon icon={comment} size="xs" key="icon" />),
                  (<span key="counts">
                    {this.props.comment_count?this.props.comment_count:0}
                  </span>)] : null
              }
            </div>
            </div>

        </div>
    )
  }
}

class NoteList extends React.Component {

  constructor(props){
      super(props);
  }
  render() {
    let className = "avatar" + this.getSizeClassName();
    return(
        <div
            className={this.props.className?className+" "+this.props.className:className}
        >
           <img src={this.props.src}/>
        </div>
    )
  }
}

export {NoteListItem,NoteList};
