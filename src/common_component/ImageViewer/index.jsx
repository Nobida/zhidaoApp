//== ImageViewer

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const imageContainer = ReactDOM.findDOMNode(this.refs.imageContainer);
    const imageViewer = ReactDOM.findDOMNode(this.refs.imageViewer);
    const o = this;
     $(imageContainer).each(function () {
       new RTP.PinchZoom($(this), {});
     });
     $(imageViewer).on('click',function(){
       if(o.props.onRequestClose){
         o.props.onRequestClose();
       }
     })
  }
  render() {
    return (
      <div className='image-viewer' ref='imageViewer'>
        <div className='image-container' ref='imageContainer'>
          <img src={this.props.src}/>
        </div>
      </div>
    );
  }
}
ImageViewer.propTypes = {
  src: PropTypes.string,
  onRequestClose: PropTypes.func
}
export default ImageViewer;