import React from 'react';
import ReactDOM from 'react-dom';

export class SelectionItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <li value={this.props.value}>
        {this.props.children}
      </li>
    )
  }

}
export class SelectionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let o = this;
    let selection = ReactDOM.findDOMNode(this.refs.selection);
    $(selection).on("click",function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropeddown').slideToggle(300);
    }).focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropeddown').slideUp(300);
    });
    $(selection).find("li").click(function () {
        $(this).parents('.drop-menu').find('span').text($(this).text());
        $(this).parents('.drop-menu').find('input').attr('value', $(this).attr('value'));
        if(o.props.onSelectionChange){
          o.props.onSelectionChange($(this).attr("value"));
        }
    });
    /*End Select Box js*/
  }

  render() {
    const className = 'drop-menu' + (this.props.unableFullWidth?'':' full-width') + (this.props.className?' '+this.props.className:'');
    return (
     <div className={className} ref="selection">
          <div className="select">
            <span>{this.props.label}</span>
            <i className="fa fa-chevron-down"></i>
          </div>
          <input type="hidden"/>
          <ul className="dropeddown">
            {this.props.children}
          </ul>
     </div>
    );
  }
}
