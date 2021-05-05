/**
 * Audio
 */

import React from "react";
import ReactDOM from 'react-dom';
import {play,pause,next,prev,left,right} from '../../svg'
import Icon from '../../common_component/Icon'
import PropTypes from 'prop-types'
import {loadings} from "../../svg/index";
import {isWeixinBrowser} from "../../utils/wechat";

class Audio extends React.Component {

  constructor(props){
    super(props);
    this.state={
      playState: 'paused',
      second: 0,
      duration: 0,
      minimal: false,
      loading: false
    }
  }

  parseTime(t){
    let miniteTime = 0.0
    let secondTime = 0.0
    miniteTime = Math.floor(t/60)
    secondTime = Math.floor(t-miniteTime*60)
    miniteTime == miniteTime < 10?'0'+miniteTime:miniteTime+''
    secondTime = secondTime<10?'0'+secondTime:secondTime+''
    return miniteTime+':'+secondTime
  }

  audioPlay() {
    let audioPlayer = ReactDOM.findDOMNode(this.refs.audioPlayer)
    $(audioPlayer)[0].play();
  }

  setPlayerControl(o){
    let prev = ReactDOM.findDOMNode(o.refs.prev)
    let play = ReactDOM.findDOMNode(o.refs.play)
    let playSm = ReactDOM.findDOMNode(o.refs.playSm)
    let next = ReactDOM.findDOMNode(o.refs.next)
    let audioPlayer = ReactDOM.findDOMNode(o.refs.audioPlayer)
    let progress = ReactDOM.findDOMNode(o.refs.progress);
    let minimizeHandler = ReactDOM.findDOMNode(o.refs.minimizeHandler);
    let restoreHandler = ReactDOM.findDOMNode(o.refs.restoreHandler);

    $(audioPlayer)[0].load();
    console.log('audio player')
    console.log($(audioPlayer)[0].duration)

    $(minimizeHandler).on('click',function(){
      o.setState({minimal:true})
    })
    $(restoreHandler).on('click',function(){
      o.setState({minimal:false})
    })
    //设置音频加载开始
    $(audioPlayer).on('loadstart',function(){
      o.setState({loading:true});
    })
    //设置音频时间更新
    $(audioPlayer).on('timeupdate',function(){
      o.setState({duration: this.duration, second: this.currentTime})
      //时间结束响应
      if(this.currentTime == this.duration && o.props.onTimeFinish){
        o.props.onTimeFinish()
      }
    }).on('loadedmetadata',function(){
      o.setState({loading:false});
      if(o.props.start_second){
        audioPlayer.currentTime = o.props.start_second;
      }
      if(o.state.playState=='played'){
        o.audioPlay();
      }
      o.setState({duration: this.duration, second: this.currentTime})
    })

    //设置播放按钮的响应
    $(play).on('click',function(){
      const {playState} = o.state;
      if(playState=='paused') {
        o.audioPlay();
        o.setState({playState:'played'})
      }
      else if(playState=='played'){
        $(audioPlayer)[0].pause();
        o.setState({playState:'paused'})
      }
    })

    $(playSm).on('click',function(){
      const {playState} = o.state;
      if(playState=='paused') {
        o.audioPlay();
        o.setState({playState:'played'})
      }
      else if(playState=='played'){
        $(audioPlayer)[0].pause();
        o.setState({playState:'paused'})
      }
    })
    //设置前后控制响应
    $(prev).on('click',function(){
      if (o.props.onPrevClick){
        o.props.onPrevClick()
      }
    })
    $(next).on('click',function () {
      if (o.props.onNextClick){
        o.props.onNextClick()
      }
    })

    //设置进度条点击效果
    $(progress).on('click',function (e) {
      const {playState,duration} = o.state
      const parentOffset = $(this).offset();
      const relX = e.pageX - parentOffset.left;
      const percPos = relX * 100 / $(this).width();
      const second = duration * parseInt(percPos) / 100;

      console.log('relX');
      console.log(relX);
      console.log('precPos');
      console.log(percPos)
      console.log('second');
      console.log(second);
      audioPlayer.currentTime = second;
      o.setState({second: second});
      if(playState=='played'){
        o.audioPlay();
      }
    })
  }

  componentDidMount(){
    const o = this;
    this.setPlayerControl(o);
  }

  componentWillReceiveProps(nextProps) {
    let audioPlayer = ReactDOM.findDOMNode(this.refs.audioPlayer)
    let title = ReactDOM.findDOMNode(this.refs.title);
    if(nextProps.src && nextProps.src!=this.props.src){
      const {second,duration} = this.state;
      if(this.props.onSrcChange) {
        this.props.onSrcChange(this.props.id,second, duration);
      }
      $(audioPlayer).attr('src',nextProps.src)

      $(audioPlayer)[0].load()
    }
  }

  render() {
    const {playState,duration,second,minimal} = this.state;
    const {has_prev,has_next} = this.props;
    return(
      <div>
        <audio src={this.props.src} id="hidden-player" ref='audioPlayer'></audio>
        <div className={'audio-player' + (minimal ? ' hide':'')}>

          <div className='top-container'>
            <div className='title' ref='title'>
              {this.props.title}
            </div>
            <div className='controls'>
              <Icon ref="prev" className={'prev control' + has_prev?'':' disable'} icon={prev} size="xs"/>
              <Icon ref="play" className='play control' icon={playState == 'paused'?play:pause} size="xs"/>
              <Icon ref="next" className={'next control' + has_next?"":' disable'} icon={next} size="xs"/>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='time-now' ref='timeNow'>
              {this.parseTime(second)}
            </div>
            <progress value={second/duration} max={1} ref='progress'/>
            <div className='time-finish' ref='timeFinish'>
              {this.state.loading?(<Icon size='xs' icon={loadings}/>):this.parseTime(duration)}
            </div>
          </div>
          <div className='hide-handler' ref='minimizeHandler'>
            {right}
          </div>
        </div>
        <div className={'audio-player-small' + (minimal ? '':' hide')}>
            <div className='hide-handler' ref='restoreHandler'>
              {left}
            </div>
            <div className='play-btn-sm' ref='playSm'>
              {playState=='played'?pause:play}
            </div>
        </div>
      </div>
    )
  }
}

Audio.propTypes = {
  id: PropTypes.id, //ID
  title: PropTypes.string, //标题
  src: PropTypes.string, //当前音频源
  start_second: PropTypes.number, //音频播放开始时间
  has_next: PropTypes.bool, //是否有下一首
  has_prev: PropTypes.bool, //是否有上一首
  onPrevClick: PropTypes.func, //前一首点击事件
  onNextClick: PropTypes.func, //后一首点击事件
  onTimeFinish: PropTypes.func, //结束事件
  onPause: PropTypes.func, //暂停事件
  onPlay: PropTypes.func, //播放事件
  onSrcChange: PropTypes.func //播放源改变事件

}

export default Audio;
