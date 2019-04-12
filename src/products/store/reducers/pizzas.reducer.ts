import { Pizza } from 'src/products/models/pizza.model';
import * as fromAction from './../actions/pizzas.action'

export interface PizzaState {
  // data: Pizza[];
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}
export const initialState: PizzaState = {
  // data: [],
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromAction.PizzasAction): PizzaState {

  switch (action.type) {
    case fromAction.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromAction.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      debugger;
      const entities = pizzas.reduce((entities: { [id: number]: Pizza }, pizza: Pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza
        }
      },
        {
          ...state.entities
        });
      debugger;
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      }
    }
    case fromAction.LOAD_PIZZAS_FAIL: {
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
export const getPizzasEntities = (state: PizzaState) => state.entities;
