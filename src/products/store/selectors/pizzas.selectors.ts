import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';

// #region Below lines demonstration
//
// const state = {
//   products: {
//     pizzas: {
//       data: [],
//       loaded: false,
//       loading: false
//     }
//   }
// }
// #endregion

export const getPizzaState = createSelector(
  fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.pizzas);

export const getPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzaEntities);

export const getSelectedPizza = createSelector(
  getPizzasEntities, fromRoot.getRouterState, (sEntities, sRouter) => {
    debugger;
    return sRouter.state && sEntities[sRouter.state.params.pizzaId];
  })

export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
})

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
