import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizzasAction from '../actions/pizzas.action';

export interface PizzaState {
  data: Pizza[],
  loaded: boolean,
  loading: boolean
}
export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzasAction.PizzasAction
): PizzaState {
  debugger;
  console.log('🤹‍', action);
  switch (action.type) {
    case fromPizzasAction.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }
    //
    case fromPizzasAction.LOAD_PIZZAS_SUCCESS: {
      console.log('👍- payload', action.payload)
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      }
    }
    //
    case fromPizzasAction.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }
  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
