import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppingsSelectors from './toppings.selectors';

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
    return sRouter.state && sEntities[sRouter.state.params.pizzaId];
  });

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  fromToppingsSelectors.getToppingEntities,
  fromToppingsSelectors.getSelectedToppings,
  (selectedPizza, toppingEntities, selectedToppings) => {
    debugger;
    const toppings = selectedToppings.map(id => toppingEntities[id]);
    return { ...selectedPizza, toppings };
  });

export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
})

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
