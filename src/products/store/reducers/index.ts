import { ActionReducerMap } from '@ngrx/store';
import * as fromReducer from './pizzas.reducer';


export interface ProductsState {
  pizzas: fromReducer.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromReducer.reducer
}
