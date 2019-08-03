import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromToppingsReducer from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.toppings);

export const getToppingEntities = createSelector(getToppingsState, fromToppingsReducer.getToppingEntities);

export const getAllToppings = createSelector(getToppingEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getToppingsLoaded = createSelector(getToppingsState, fromToppingsReducer.getToppingsLoading);
export const getToppingsLoading = createSelector(getToppingsState, fromToppingsReducer.getToppingsLoading);
