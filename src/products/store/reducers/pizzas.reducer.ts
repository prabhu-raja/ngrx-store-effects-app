import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizzasAction from '../actions/pizzas.action';

export interface PizzaState {
  // data: Pizza[],
  entities: { [id: number]: Pizza },
  loaded: boolean,
  loading: boolean
}
export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

/* Entities demonstration
const pizza = {
  1: {
    id: 1,
    name: 'pizza',

  }
}
*/

export function reducer(
  state = initialState,
  action: fromPizzasAction.PizzasAction
): PizzaState {
  console.log('🍕- Action', action);
  switch (action.type) {
    case fromPizzasAction.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      }
    }
    //
    case fromPizzasAction.LOAD_PIZZAS_SUCCESS: {
      console.log('🍕- Payload', action.payload)
      const data = action.payload;
      // Array to Object
      const entities = data.reduce((objEntities: { [id: number]: Pizza }, pizza: Pizza) => {
        return {
          ...objEntities,
          [pizza.id]: pizza
        }
      }, {
          ...state.entities
        });

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
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
    //
    case fromPizzasAction.CREATE_PIZZA_SUCCESS:
    case fromPizzasAction.UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      }
      return {
        ...state,
        entities
      }
    }
    //
    case fromPizzasAction.REMOVE_PIZZA_SUCCESS: {
      debugger;
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities;
      console.log('😀', removed);
      console.log('👍', entities);
      return {
        ...state,
        entities
      }
    }
  }

  return state;

}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzaEntities = (state: PizzaState) => state.entities;
