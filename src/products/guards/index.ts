import { PizzasGuard } from './pizzas.guard';
import { PizzaExistsGuards } from './pizza-exists.guards';

export const guards: any[] = [PizzasGuard, PizzaExistsGuards];

export * from './pizzas.guard';
export * from './pizza-exists.guards';
