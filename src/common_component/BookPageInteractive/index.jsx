//== BookPage
//

import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../Loadings';
import {TabItem,TabContainer} from '../SwitchLayout';
import {ROOT_URL} from '../../api/const';
import IconButton from '../../common_component/IconButton'
import Icon from '../../common_component/Icon'
import {share,refresh,down,left,right,more} from "../../svg/index";
import PropTypes from 'prop-types'

import Avatar from '../../common_component/Avatar'

// BookPageInteractive

const speakerAvatars = {
  '人文君'  :'http://img3.imgtn.bdimg.com/it/u=3899579356,3970391241&fm=26&gp=0.jpg',
  '学员':'http://img4.imgtn.bdimg.com/it/u=3223186911,2863052117&fm=26&gp=0.jpg'
}

class BookPageInteractive extends React.Component {
  constructor(props) {
    super(props);
  }
  showNext(){

  }
  isEqualElement(ele1,ele2){
    let isEqual = ($(ele1).text() == $(ele2).text())&&($(ele1).index() == $(ele2).index());
    let ele1Type = $($(ele1).parent()).prop("tagName");
    isEqual = isEqual ? $(ele1Type).index($($(ele1).parent())) == $(ele1Type).index($($(ele2).parent())):false;
    return isEqual;
  }
  getSelection(){
    let selection;
    let selectionText;
    let baseNode;
    let extentNode;
    let baseNodeIndex = -1;
    let extentNodeIndex = -1;
    let startOffset = -1;
    let endOffset = -1;
    let page_type = this.props.page_type;
    if (window.getSelection) {
        selection = window.getSelection();
        selectionText = selection.toString();
        if(selectionText.length){
            let contentsInfo = this.getContentsNodes();
            let contentsNodes = contentsInfo.contentNodes;
            let contentsPos = contentsInfo.contentsPos;
            let contentsJoin = contentsInfo.contentsJoin;
            let outers = contentsInfo.outers;
            let anchor ;
            let anchor_index;
            let anchor_offset;
            let offset;
            let page_offset;
            baseNode = selection.baseNode;
            extentNode = selection.extentNode;

            for(let i=0;i<contentsNodes.length;i++){
              if(this.isEqualElement(contentsNodes[i],baseNode)){
                baseNodeIndex = i
              }
              if(this.isEqualElement(contentsNodes[i],extentNode)){
                extentNodeIndex = i;
              }

            }
           if(baseNodeIndex != -1 && extentNodeIndex!=-1 )
            {
              if(baseNodeIndex<extentNodeIndex || (baseNodeIndex==extentNodeIndex && selection.baseOffset<selection.extentOffset)){
                startOffset = selection.baseOffset + contentsPos[baseNodeIndex][0];
                endOffset = selection.extentOffset + contentsPos[extentNodeIndex][0];
              }else{
                endOffset = selection.baseOffset + contentsPos[baseNodeIndex][0];
                startOffset = selection.extentOffset + contentsPos[extentNodeIndex][0];
              }
            }
            for(let i=0;i<outers.length;i++){
              let node = outers[i].node;
              if(outers[i].start<baseNodeIndex && $(node).hasClass('uri-anchor')){
                anchor = $(node).attr('id');
                anchor_index = outers[i].start;
              }
            }

            let selectionContents = contentsJoin.slice(startOffset,endOffset);
            let preStart = (startOffset-30>0)?startOffset-30:0;
            let postEnd = (endOffset+30<=contentsJoin.length)?endOffset+30:contentsJoin.length;
            let pre_contents = contentsJoin.slice(preStart,startOffset);
            let post_contents = contentsJoin.slice(endOffset,postEnd);

            let selectionItem = {
              contents:selectionContents,
              pre_contents,
              post_contents,
              page_offset: startOffset,
              page_type: page_type?page_type:''
            };

            if(anchor){
              selectionItem.uri_anchor = anchor;
              selectionItem.anchor_offset = contentsPos[anchor_index][0];
              selectionItem.offset = selectionItem.page_offset - selectionItem.anchor_offset;
            }

            //console.log(selectionItem);
            return selectionItem
        }
    }
     return {};

  };
  highlightElement(highlight,highlightClassName,highlightFlag,targetItem){
   let contentsInfo = this.getContentsNodes();
   let contentsNodes = contentsInfo.contentNodes;
   let contentsPos = contentsInfo.contentsPos;
   let contentsJoin = contentsInfo.contentsJoin;

    let contents = highlight['contents'];
    let pre_contents = highlight['pre_content'];
    let post_contents = highlight['post_content'];
    let page_offset = highlight['page_offset'];

    let search_contents = pre_contents+contents+post_contents;
    let startIndex = -1;

    if(!contents){
      return;
    }

    if(page_offset){
        startIndex = contentsJoin.indexOf(contents, page_offset);
    }
    if(startIndex==-1){
      if(pre_contents)
        startIndex = contentsJoin.indexOf(search_contents)+pre_contents.length;
      else{
        startIndex = contentsJoin.indexOf(contents);
      }
    }
    console.log('highlight');
    console.log(highlight);
    let endIndex = startIndex+contents.length;
    let startContentsIndex = 0;
    let endContentsIndex = 0;
    let startContentsOffset = 0;
    let endContentsOffset = 0;

    if(startIndex==-1)
        return;

   // if(startIndex>)
    for(let i=0;i<contentsPos.length;i++){
      if(startIndex>=contentsPos[i][0] && startIndex<contentsPos[i][1]){
        startContentsIndex = i;
        startContentsOffset = startIndex - contentsPos[i][0];
      }
      if(endIndex>contentsPos[i][0] && endIndex<=contentsPos[i][1]){
        endContentsIndex = i;
        endContentsOffset = endIndex - contentsPos[i][0];
        break;
      }
    }

    if(highlightFlag){

      for(let i=startContentsIndex;i<=endContentsIndex;i++){
          let highlightStart = 0;
          let highlightEnd = -1;
          let text = $(contentsNodes[i]).text();
          if(i==startContentsIndex){
              highlightStart = startContentsOffset;
          }
          if(i==endContentsIndex){
              highlightEnd = endContentsOffset;
          }
          $(contentsNodes[i]).wrap('<span class="'+highlightClassName+'"></span>');
          contentsNodes[i][0].nodeValue = text.slice(highlightStart,highlightEnd);
          if(highlightStart>0){
              $($(contentsNodes[i]).parent()).before(text.slice(0,highlightStart));
          }
          if(highlightEnd!=-1){
              $($(contentsNodes[i]).parent()).after(text.slice(highlightEnd));
          } else{
              contentsNodes[i][0].nodeValue = text.slice(highlightStart);
          }

      }
      console.log('highlightcontents'+highlight.contents);
      //添加note点击标签
      if(highlightClassName=='note-highlight' && targetItem && targetItem.contents){
          let noteLabel = $('<sub class="note-label" id="note-'+targetItem.uuid+'"></sub>');
          let o =this;
          noteLabel.on('click',function(){
              if(o.props.onNoteItemClick){
                o.props.onNoteItemClick(targetItem)
              }
          });
          $($(contentsNodes[endContentsIndex]).parent()).after(noteLabel);
      }

      if(highlightClassName=='highlight'){
        let bookpage = ReactDOM.findDOMNode(this.refs.bookpage);
        console.log($(contentsNodes[0]).parent().offset().top);
        console.log($(bookpage).parent().parent().scrollTop());
        //$(bookpage).parent().parent().scrollTo(500,500);
        console.log($($(contentsNodes[startContentsIndex]).parent()));
        $($(bookpage).parent().parent()).scrollTo($($(contentsNodes[startContentsIndex]).parent()),0);

      }

    }else{

      for(let i=startContentsIndex;i<=endContentsIndex;i++){
          //console.log('unhightlight');
      //  console.log($(contentsNodes[i]).parent());
          if($(contentsNodes[i]).parent().hasClass(highlightClassName)){
              $(contentsNodes[i]).parent().prop('outerHTML',$(contentsNodes[i]).parent().html());
          }
      }
      //删除note点击标签
      if(highlightClassName=='note-highlight' && targetItem && targetItem.contents){
          $('#note-'+targetItem.uuid).remove();
      }

    }
  }
  toggleHighlightElements(highlightFlag){

    for(let i=0;i<this.props.highlights.length;i++){
        this.highlightElement(this.props.highlights[i],'highlight',highlightFlag);
    }
  }


  imgZoom(){
    $(function () {
        $('.pic-box').each(function () {
            new RTP.PinchZoom($(this), {});
        });
    })
  }
  setMediaApi(){
    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let o = this;
    let medias = $(bookPage).find('.pv-media');
    for(let i=0;i<medias.length;i++){
      let uri = $(medias[i]).attr('uri');
      $(medias[i]).attr('src',ROOT_URL + 'media/'+uri+'?apikey='+o.props.apikey);
    }
  }
  bindFootMarkClick(){
    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let o = this;
    function findFootNote(footnote_id){
      let footNotes = $(bookPage).find('.footnote');
      for(let i=0;i<footNotes.length; i++){
        if($(footNotes[i]).attr("footnote_id") == footnote_id)
          return $(footNotes[i]);
      }
      return null;
    }
    $(bookPage).find(".footnote-mark").bind('click',function(){
      let footnote_id = $(this).attr("footnote_id");
      let footNote = findFootNote(footnote_id);
      let footNoteText = $($(footNote).find('.content')[0]).text();
      if(o.props.onFootMarkClick){
        o.props.onFootMarkClick(footNoteText);
      }
    })
  }

  getContentsNodes(){

    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let contentsNodes = [];
    let stack = [{'node':$(bookPage),'lastChild':0}];
    let contents = [];
    let contentsPos = [];
    let startPos = 0;
    let endPos = 0;
    let contentsJoin = "";
    let outerStack = [];
    let outers = [];
    while(true){
      let stackEnd = stack.pop();
      if(!stackEnd){
        break;
      }
      outerStack.push({
        node:stackEnd.node,
        start:contentsNodes.length,
        type:$(stackEnd.node).prop('tagName')?$(stackEnd.node).prop('tagName'):'text'});

      let pointer = stackEnd.node;
      let lastChild = stackEnd.lastChild;
      if($(pointer).contents().length){
        for(let i=$(pointer).contents().length-1;i>=0;i--){
          stack.push({node:$(pointer).contents()[i],lastChild:(i==$(pointer).contents().length-1)?lastChild+1:0});
        }
      }else{
        contentsNodes.push($(pointer));
        let outer = outerStack.pop();
        outer.end = contentsNodes.length;
        outers.push(outer);
        for(let i=0;i<lastChild;i++){
          outer = outerStack.pop();
          outer.end = contentsNodes.length;
          outers.push(outer);
        }

      }
    }


    let pNodes = [];
    for(let i=0;i<outers.length;i++){
      let node = outers[i].node;
      if(outers[i].type=='P' || outers[i].type=='BR'){
        pNodes.push(outers[i].end-1);
      }
      if($(node).hasClass('title-l1') || $(node).hasClass('title-l2')
        || $(node).hasClass('title-l3')||$(node).hasClass('title-l4')
      ||$(node).hasClass('title-l5') ||$(node).hasClass('title-l6')){
        pNodes.push(outers[i].end-1)
      }
    }

    for(let i=0;i<contentsNodes.length;i++){
      let text = $(contentsNodes[i]).text();
      let l = text.length;
      endPos = startPos+l;
      if(pNodes.indexOf(i) != -1){
        text +='\n';
        endPos+=1;
      }
      contents.push(text);
      contentsPos.push([startPos,endPos]);
      startPos = endPos;
    }
    contentsJoin = contents.join("");
   // console.log('contentNodes');
    //console.log(contentsNodes);
    return {
        contentNodes:contentsNodes,
        contentsJoin:contentsJoin,
        contentsPos:contentsPos,
        outers: outers
    };

  }


  getChildrenNodes(){
    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let childs = $(bookPage).children();
    $(childs).hide();
    $(childs[0]).show();
    console.log(childs);
  }
  initAvatar(){
    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let speaks = $(bookPage).find('.speak');
    for(let i=0;i<speaks.length;i++){
      let speaker_name = $(speaks[i]).find('.speaker').attr('speaker')
      console.log('speaker name');
      console.log(speaker_name);
      if($(speaks[i]).hasClass('right')) {
        $(speaks[i]).find('.speaker').append(
          '<div class="avatar small">' +
          '<img src="' + ROOT_URL+'/pic/avatar/'+speaker_name+'.jpg' + '"/>' +
          '</div>'
        )
      }
      if($(speaks[i]).hasClass('left')) {
        $(speaks[i]).find('.speaker').prepend(
          '<div class="avatar small">' +
          '<img src="' + ROOT_URL+'/pic/avatar/'+speaker_name+'.jpg' + '"/>' +
          '</div>'
        )
      }
    }

  }
  showChildrenNodes(nodeNum){
    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let childs = $(bookPage).children();
    for(let i=0;i<childs.length;i++){
      if(i<=nodeNum){
        $(childs[i]).show();
      }else{
        $(childs[i]).hide();
      }
    }
    if(childs.length>0 && nodeNum<childs.length-1){
      $(bookPage).parent().parent().scrollTo($(childs[nodeNum]))
      if(this.props.onLoading){
        this.props.onLoading()
      }
    }
    if(childs.length>0 && nodeNum==childs.length-1){
      $(bookPage).parent().parent().scrollTo($(childs[nodeNum]))
      if(this.props.onLoaded){
        this.props.onLoaded()
      }
    }
    if(childs.length>0 && nodeNum>=childs.length){
      if(this.props.onPageChange){
          this.props.onPageChange();
      }
    }

  }

  componentWillReceiveProps(nextProps){

      let bookpage = ReactDOM.findDOMNode(this.refs.bookpage);
      if(!this.props.content && nextProps.content){
        if(nextProps.content.html){
          $(bookpage).html(nextProps.content.html);
          this.initAvatar();
          let childs = $(bookPage).children();
          // if(childs.length-1 <=nextProps.progress && nextProps.onLoaded){
          //   nextProps.onLoaded()
          // }
          // if(childs.length-1 >nextProps.progress && nextProps.onLoading){
          //   nextProps.onLoading()
          // }
          this.imgZoom();
        }
      }
      if(nextProps.content && nextProps.progress!=this.props.progress){
        this.showChildrenNodes(nextProps.progress)
      }
  }
  componentDidMount(){

    this.getSelection();

    let bookPage = ReactDOM.findDOMNode(this.refs["bookpage"]);
    let o=this;

     let bookpage = ReactDOM.findDOMNode(this.refs.bookpage);
      if(this.props.content){
        if(this.props.content.html){
          $(bookpage).html(this.props.content.html);
          this.initAvatar();
          let childs = $(bookPage).children();
          if(childs.length-1 <=this.props.progress && this.props.onLoaded){
            this.props.onLoaded()
          }
          if(childs.length-1 >this.props.progress && this.props.onLoading){
            this.props.onLoading()
          }
        }
        this.imgZoom();
        this.showChildrenNodes(this.props.progress)
      }
  }


  render() {
    let className = 'book-page interactive';
    let loaded = !!this.props.content;
    return (
      <div>
        <div className={this.props.className?className+' '+this.props.className:className}
             id={this.props.id?this.props.id:''}
             ref="bookpage">

        </div>
        <Loadings show={!loaded}/>
      </div>
    );
  }
}

BookPageInteractive.propTypes = {
  progress: PropTypes.number, //当前进度，表示显示到第n个节点
  content: PropTypes.object, //内容
  onLoaded: PropTypes.func, //加载完成的响应函数
  onLoading: PropTypes.func, //正在加载过程的响应函数
  onPageChange: PropTypes.func,  //换页事件
}

class InteractiveFooter extends React.Component {
  render(){
    return(
    <div className='interactive-footer'>
      <Icon onClick={this.props.onRefresh}  icon={refresh} className='refresh-btn'/>
      <IconButton size='sm' onClick={this.props.onNext} icon={this.props.loaded?right:down}/>
      <Icon onClick={this.props.onMoreClick} icon={more} className={this.props.more_tool_active?'more-btn active':'more-btn'}/>
    </div>
    )
  }
}

InteractiveFooter.propTypes = {
  onNext: PropTypes.func, //下一步事件
  onRefresh: PropTypes.func,  //更新事件
  loaded: PropTypes.bool, //是否加载完成
  more_tool_active: PropTypes.bool
}

export {BookPageInteractive,InteractiveFooter};


