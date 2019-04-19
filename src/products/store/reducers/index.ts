import * as fromPizzasReducers from './pizzas.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: fromPizzasReducers.PizzaState
}

export const allReducers = {
  pizzas: fromPizzasReducers.reducer
};

// * Below lines demonstration
// const state = {
//   products: {
//     pizzas: {
//       data: [],
//       loaded: false,
//       loading: false
//     }
//   }
// }
export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getPizzasEntities = createSelector(getPizzaState, fromPizzasReducers.getPizzaEntities);
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
})

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoading);
