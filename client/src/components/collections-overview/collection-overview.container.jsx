import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors.js";
import WithSpinner from "../with-spinner.component/with-spinner.component";
import CollectionsOverviewComponent from "./collections-overview.component.jsx";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverviewComponent);

export default CollectionOverviewContainer;
