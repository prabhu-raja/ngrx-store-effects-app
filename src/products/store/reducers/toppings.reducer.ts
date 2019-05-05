import { Topping } from 'src/products/models/topping.model';
import * as fromToppingsAction from '../actions/toppings.action';

export interface ToppingsState {
  entities: { [id: number]: Topping },
  loaded: boolean,
  loading: boolean,
  selectedToppings: number[]
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
}

export function reducer(
  state = initialState,
  action: fromToppingsAction.ToppingsAction
): ToppingsState {
  console.log('🧗‍Topping - Actions', action);
  switch (action.type) {
    //
    case fromToppingsAction.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      }
    }
    //
    case fromToppingsAction.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      }
    }
    //
    case fromToppingsAction.LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      }
    }
    //
    case fromToppingsAction.LOAD_TOPPINGS_SUCCESS: {
      const data = action.payload;
      const entities = data.reduce((objEntities: { [id: number]: Topping }, topping: Topping) => {
        return {
          ...objEntities,
          [topping.id]: topping
        }
      }, {
          ...state.entities
        });

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      }
    }
  }
  return state;
}

export const getToppingLoaded = (state: ToppingsState) => state.loaded;
export const getToppingLoading = (state: ToppingsState) => state.loading;
export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
