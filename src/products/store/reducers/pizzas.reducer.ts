import { Pizza } from 'src/products/models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza }
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {

  switch (action.type) {
    //
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      console.log('🍕 - action', action.payload);
      const pizzas = action.payload;
      const entities = convertToObj(pizzas, state.entities)
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromPizzas.CREATE_PIZZA: {

    }

    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza
      };
      return {
        ...state,
        entities
      }

    }

    case fromPizzas.CREATE_PIZZA_FAIL: {

    }
  }
  return state;
}

function convertToObj(pizzas: Pizza[], existEntities: { [id: number]: Pizza }) {
  const entities = pizzas.reduce((accumulated: { [id: number]: Pizza }, item) => {
    accumulated[item.id] = item;
    return accumulated;
  }, {
      ...existEntities
    }
  );
  return entities;
}

export const getPizzaEntities = (state: PizzaState) => state.entities;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasLoading = (state: PizzaState) => state.loading;
