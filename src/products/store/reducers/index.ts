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

export const getPizzasEntities = createSelector(getPizzaState, fromReducer.getPizzasEntities);
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
})
export const getPizzasLoaded = createSelector(getPizzaState, fromReducer.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromReducer.getPizzasLoading);
