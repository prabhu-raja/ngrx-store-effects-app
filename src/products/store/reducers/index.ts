import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzaReducer from './pizzas.reducer';
import * as fromToppingsReducer from './toppings.reducer';


export interface ProductsState {
  pizzas: fromPizzaReducer.PizzaState;
  toppings: fromToppingsReducer.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzaReducer.reducer,
  toppings: fromToppingsReducer.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

// export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

// export const getPizzasEntities = createSelector(getPizzaState, fromPizzaReducer.getPizzaEntities);
// export const getPizzasLoaded = createSelector(getPizzaState, fromPizzaReducer.getPizzasLoaded);
// export const getPizzasLoading = createSelector(getPizzaState, fromPizzaReducer.getPizzasLoading);
// export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
//   return Object.keys(entities)
//     .map(id => entities[parseInt(id, 10)]);
// })
