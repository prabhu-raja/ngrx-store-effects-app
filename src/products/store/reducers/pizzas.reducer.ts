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
      console.log('Pizza Reducers - action-LOAD_PIZZAS :', action.type);
      return {
        ...state,
        loading: true
      };
    }

    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      console.log('Pizza Reducers - action-LOAD_PIZZAS_SUCCESS :', action.type);
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
      console.log('Pizza Reducers - action-LOAD_PIZZAS_FAIL :', action.type);
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromPizzas.CREATE_PIZZA:
    case fromPizzas.UPDATE_PIZZA: {
      console.log('Pizza Reducers - action-CREATE/UPDATE_PIZZA :', action.type);
      return state;
    }

    case fromPizzas.CREATE_PIZZA_SUCCESS:
    case fromPizzas.UPDATE_PIZZA_SUCCESS: {
      console.log('Pizza Reducers - action-CREATE/UPDATE_PIZZA_SUCCESS :', action.type);
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
      console.log('Pizza Reducers - action-CREATE_PIZZA_FAIL :', action.type);
    }

    case fromPizzas.REMOVE_PIZZA: {
      console.log('Pizza Reducers - action-REMOVE_PIZZA :', action.type);
      return state;
    }
    case fromPizzas.REMOVE_PIZZA_SUCCESS: {
      console.log('Pizza Reducers - action-REMOVE_PIZZA_SUCCESS :', action.type);
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities
      return {
        ...state,
        entities
      };
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
