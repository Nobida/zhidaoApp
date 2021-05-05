//== Switch
//

import React from 'react';
import PropTypes from 'prop-types'
// Switch

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state={checked: true};
  }
  componentDidMount(){
    const {checked} = this.props;
    this.setState({checked:checked});
  }
  onChange(){
    const {onChange,checked} = this.props;
    if(onChange){
      onChange(checked);
    }
  }

  render() {
    const className = 'switch'+(this.props.checked?'':' disable')+(this.props.className?' '+this.props.className:'');
    return (
      <div className={className} onClick={this.onChange.bind(this)}>
          <div className="switch-handler"/>
      </div>
    );
  }
}

Switch.propTypes = {
  onChange: PropTypes.func, //状态切换的函数
  checked: PropTypes.bool, //是否被选中
  className: PropTypes.string //类名
}

export default Switch;


