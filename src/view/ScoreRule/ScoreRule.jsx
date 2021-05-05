import React from 'react';
import {SCORE_RULE_ID} from "../../api/const";
import Article from '../Article'
import './style.scss';

export default class ScoreRule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='score-rule'>
        <Article article_id={SCORE_RULE_ID}/>
      </div>

    );
  }
}
