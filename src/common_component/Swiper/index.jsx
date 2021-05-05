/**
 * Swiper
 */

import React from "react";

class SwiperItem extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
        return(
        <div className={this.props.className?"swiper-slide "+this.props.className:'swiper-slide'}
            style={this.props.style?this.props.style:null}
          >
            {this.props.children}
        </div>
        )
    };
}
class SwiperContainer extends React.Component {

  constructor(props){
      super(props);
      this.swiper = null;
      this.state = {
        activeIndex: 0
      }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.activeSlide!=this.state.activeIndex){
      this.setState({activeIndex:nextProps.activeSlide});
     if(this.swiper){
        console.log(this.swiper);
        this.swiper.slideTo(nextProps.activeSlide,500);
      }
    }
  }
  componentDidMount(){

      let onSlideChange = this.props.onSlideChange;
      let onProgress = this.props.onProgress;
      let initialSlide = this.props.activeSlide;
      let o = this;  
      this.swiper = new Swiper('.swiper-container',{
          loop: false,
          autoplay: false,
          noSwiping : true,
          slidesPerView:"auto",
            centeredSlides:!0,
            watchSlidesProgress:!0,
          initialSlide: (initialSlide)?initialSlide:0,
          onSlideChangeEnd: function(swiper){
            o.setState({activeIndex:swiper.activeIndex});
            if(onSlideChange){
                onSlideChange(swiper.activeIndex);
            }
          },
          onProgress:function(swiper){
            if(onProgress){
                onProgress(swiper);
            }
        },
        onSetTransition:function(a,b){
            var es
            for(var c=0;c<a.slides.length;c++){
                es=a.slides[c].style
                es.webkitTransitionDuration=es.MsTransitionDuration=es.msTransitionDuration=es.MozTransitionDuration=es.OTransitionDuration=es.transitionDuration=b+"ms";
            }
        }})
  }
  render() {
    let className = "swiper-container";

    return(

        <div className={this.props.className?"swiper-container "+this.props.className:'swiper-container'}>
            <div className={this.props.wrapperClassName?"swiper-wrapper "+this.props.wrapperClassName:'swiper-wrapper'} style={{"height":document.body.offsetHeight+'px'}}>
                {this.props.children}
            </div>
        </div>
    )
  }
}

export {SwiperItem, SwiperContainer};
