import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services/pizzas.service';

@Injectable()
export class PizzasEffects {

  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService) { }

  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzaService
          .getPizzas()
          .pipe(
            map(arrPizzas => new pizzaActions.LoadPizzasSuccess(arrPizzas)),
            catchError(err => of(new pizzaActions.LoadPizzasFail(err)))
          );
      })
    );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((axn: pizzaActions.CreatePizza) => axn.payload),
      switchMap(plPizza => {
        return this.pizzaService
          .createPizza(plPizza)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(err => of(new pizzaActions.CreatePizzaFail(err)))
          );
      })

    );
}
