import React from "react";

import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../pages/collection/collection.component";

import WithSpinner from "../../components/with-spinner.component/with-spinner.component";

import { connect } from "react-redux";

import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils.js";

import { updateCollections } from "../../redux/shop/shop.action";

//////////////////////////////////////////////////////////////////////////////////////////////

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsuscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    this.unsuscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionMap);

      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner {...props} isLoading={loading} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollections: (collectionMap) =>
      dispatch(updateCollections(collectionMap)),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
