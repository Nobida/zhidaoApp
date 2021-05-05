import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Card from '../../common_component/Card';
import {ROOT_URL} from "../../api/const";
import Loadings from '../../common_component/Loadings'

export default class RoundTable extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {actions, match} = this.props;
    if(match.params.course_id){
      actions.fetchRoundTableListByCourse(match.params.course_id);
    }else{
      actions.fetchRoundTableList();
    }
    $(window).scrollTo(0);
  }
  render() {
    const {fetching_round_table_list,round_tables} = this.props.round_table;
    let roundTableItems;
    if(round_tables.length){
      roundTableItems = round_tables.map(function(d,i){
        return (
          <Link className="round-table-card" to={'/round-table-content/' + d.uuid} key={d.uuid}>
            <Card bg={ROOT_URL+d.picture}>
              <h3><b>{d.name}</b></h3>
              <p className="desc">{d.desc}</p>
            </Card>
          </Link>
        )
      })

    }
    return (
      <div className="round-tables">
        {fetching_round_table_list?<Loadings show/>:roundTableItems}
      </div>
    );
  }
}
