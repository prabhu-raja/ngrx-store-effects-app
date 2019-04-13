import * as fromPizzasReducers from './pizzas.reducer';

export interface ProductsState {
  pizzas: fromPizzasReducers.PizzaState
}

export const reducers = {
  pizzareducer: fromPizzasReducers.reducer
};
