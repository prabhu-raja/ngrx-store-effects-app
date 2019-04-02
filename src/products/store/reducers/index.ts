import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './pizzas.reducer';


export interface ProductsState {
  pizzas: fromReducer.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromReducer.reducer
}

/*
*This is the small demonstration
const objState = {
  products: {
    pizzas: {
      data: ['allData'],
      loaded: false,
      loading: false
    }
  }
}
*/

export const getProductsState = createFeatureSelector<ProductsState>('products');

//pizzas state
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);

export const getAllPizzas = createSelector(getPizzaState, fromReducer.getPizzas);
export const getPizzasLoaded = createSelector(getPizzaState, fromReducer.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromReducer.getPizzasLoading);
