import ShopActionTypes from "./shop.types";

export const updateCollections = (collectionMap) => {
  console.log("collection map", collectionMap);
  return { type: ShopActionTypes.UPDATE_COLLECTIONS, payload: collectionMap };
};
