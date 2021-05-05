import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import { fetchProducts } from "../../actions/product";
import { addProduceIntoCarts} from "../../actions/cart";
import Square from './Square';
import {withRouter} from 'react-router'

export default withRouter(Square);
