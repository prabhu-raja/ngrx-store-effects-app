import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers';
import * as fromPizzaReducer from '../reducers/pizzas.reducer';
import { Pizza } from 'src/products/models/pizza.model';

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
    debugger;
    return router.state && entities[router.state.params.pizzaId]
  }
);
