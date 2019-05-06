import { Action } from '@ngrx/store';
import { Pizza } from 'src/products/models/pizza.model';

//#region Load Pizza
// * Action Types
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';

// * Action Creators
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(private payload: any) { }
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) { }
}
//#endregion

//#region Create Pizza
export const CREATE_PIZZA = '[Products] Create Pizzaa';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizzaa Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizzaa Success';

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) { }
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) { }
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) { }
}
//#endregion

export type PizzasAction =
  LoadPizzas |
  LoadPizzasFail |
  LoadPizzasSuccess |
  CreatePizza |
  CreatePizzaFail |
  CreatePizzaSuccess;
