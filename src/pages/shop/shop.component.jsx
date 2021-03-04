import React from "react";

import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionPageContainer from "../../pages/collection/collection.container";

import WithSpinner from "../../components/with-spinner.component/with-spinner.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.action";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors.js";
//////////////////////////////////////////////////////////////////////////////////////////////

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
