import { createSelector } from '@ngrx/store';
import { Pizza } from 'src/products/models/pizza.model';
import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromPizzaReducer from '../reducers/pizzas.reducer';
import * as fromToppingsSelectors from './toppings.selectors';

export const getPizzaState = createSelector(
  fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.pizzas);

export const getPizzasEntities = createSelector(getPizzaState, fromPizzaReducer.getPizzaEntities);

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzaReducer.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzaReducer.getPizzasLoading);
export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
})

export const getSelectedPizza = createSelector(
  getPizzasEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId]
  }
);

export const getPizzaVisualised = createSelector(
  getSelectedPizza,
  fromToppingsSelectors.getToppingEntities,
  fromToppingsSelectors.getSelectedToppings,
  (selectedPizza, toppingsEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingsEntities[id]);
    return { ...selectedPizza, toppings };
  });
