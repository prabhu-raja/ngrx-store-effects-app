import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import { state } from '@angular/core';

export interface ToppingsState {
  entities: { [id: number]: Topping },
  loaded: boolean;
  loading: boolean;
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false
}

export function reducer(state = initialState, action: fromToppings.ToppingsAction): ToppingsState {
  switch (action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      //
      return {
        ...state,
        loading: true
      }
    }
    case fromToppings.LOAD_TOPPINGS_FAIL: {
      //
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      console.log('🥦 - action', action.payload);
      const toppings = action.payload;
      const entities = convertToObj(toppings, state.entities);
      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      }
    }
  }
  return state;
}

function convertToObj(toppings: Topping[], existEntities: { [id: number]: Topping }) {
  const entities = toppings.reduce((accumulated: { [id: number]: Topping }, item) => {
    accumulated[item.id] = item;
    return accumulated;
  }, {
      ...existEntities
    }
  );
  return entities;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;

