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

export const getAllPizzas = createSelector(getPizzaState, fromPizzasReducers.getPizzas);
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoading);
