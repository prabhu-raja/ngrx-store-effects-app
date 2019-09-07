import { PizzasGuard } from './pizzas.guard';
import { PizzaExistsGuards } from './pizza-exists.guards';
import { ToppingsGuard } from './toppings.guards';

export const guards: any[] = [PizzasGuard, PizzaExistsGuards, ToppingsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guards';
export * from './toppings.guards';
