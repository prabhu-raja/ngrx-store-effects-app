import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import * as fromPizzasReducer from './pizzas.reducer';
import * as fromToppingReducer from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzasReducer.PizzaState;
  toppings: fromToppingReducer.ToppingsState;
}

export const allReducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzasReducer.reducer,
  toppings: fromToppingReducer.reducer
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

// export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// export const getPizzasEntities = createSelector(getPizzaState, fromPizzasReducers.getPizzaEntities);
// export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
//   return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
// })

// export const getPizzasLoaded = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoaded);
// export const getPizzasLoading = createSelector(getPizzaState, fromPizzasReducers.getPizzasLoading);
