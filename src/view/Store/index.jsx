import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import { fetchProducts } from "../../actions/product";
import { addProduceIntoCarts} from "../../actions/cart";
import Store from './Store';

const mapStateToProps = (state) => {
  const {user_stat, products} = state;
  return {
    user_stat: user_stat.stat,
    products: products.products,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserStat,
      fetchProducts,
      addProduceIntoCarts,
    },dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Store);
