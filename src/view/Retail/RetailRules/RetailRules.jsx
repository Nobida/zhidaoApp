import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Article from '../../Article'
import { RETAIL_RULE_ID } from '../../../api/const'

export default class RetailRules extends React.Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }
  render() {
  
    return (
      <div className="retail-rules"> 
        <Article article_id={RETAIL_RULE_ID} hideTitle/>
      </div>
    );
  }
}
