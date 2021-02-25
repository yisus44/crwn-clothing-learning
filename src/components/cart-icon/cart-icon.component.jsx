import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartItemsCounts } from "../../redux/cart/cart.selectors.js";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount ? itemCount : 0}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { toggleCartHidden: () => dispatch(toggleCartHidden()) };
};

const mapStateToProps = (state) => {
  return { itemCount: selectCartItemsCounts(state) };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
