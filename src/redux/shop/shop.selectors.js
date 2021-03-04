import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  (collections) => {
    return collections
      ? Object.keys(collections).map((key) => collections[key])
      : [];
  }
);
///?????
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) => {
    console.log(collections);
    const result = collections.filter((collection) => {
      return collection.routeName === collectionUrlParam;
    });

    const res = result[0];

    console.log("res", res);

    return res ? res : null;
    // console.log(collections);
    // console.log(collectionUrlParam);
  });
