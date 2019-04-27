import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

// #region Below lines demonstration
//
// const state = {
//   products: {
//     pizzas: {
//       entities: {},
//       loaded: false,
//       loading: false
//     },
//     toppings: {
//       entities: {},
//       loaded: false,
//       loading: false
//     },
//   }
// }
// #endregion

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings);

export const getToppingEntities = createSelector(getToppingsState, fromToppings.getToppingEntities);
export const getToppingLoaded = createSelector(getToppingsState, fromToppings.getToppingLoaded);
export const getToppingLoading = createSelector(getToppingsState, fromToppings.getToppingLoading);
export const getAllToppings = createSelector(getToppingEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});
