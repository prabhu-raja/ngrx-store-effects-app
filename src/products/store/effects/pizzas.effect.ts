import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/Observable/of';
import * as fromPizzaAction from '../actions/pizzas.action';
import { PizzasService } from '../../services/pizzas.service';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzasService: PizzasService
  ) { }

  @Effect()
  loadPizzas$ = this.actions$.ofType(fromPizzaAction.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzasService.getPizzas()
          .pipe(
            map(pizzas => new fromPizzaAction.LoadPizzasSuccess(pizzas)),
            catchError(err => of(new fromPizzaAction.LoadPizzasFail(err)))
          );
      })
    );

  @Effect()
  createPizza$ = this.actions$.ofType(fromPizzaAction.CREATE_PIZZA)
    .pipe(
      map((action: fromPizzaAction.CreatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzasService
          .createPizza(pizza)
          .pipe(
            map(pzza => new fromPizzaAction.CreatePizzaSuccess(pzza)),
            catchError(err => of(new fromPizzaAction.CreatePizzaFail(err)))
          );
      })
    );

  @Effect()
  updatePizza$ = this.actions$.ofType(fromPizzaAction.UPDATE_PIZZA)
    .pipe(
      map((action: fromPizzaAction.UpdatePizza) => action.payload),
      switchMap(pizza => {
        return this.pizzasService.updatePizza(pizza)
          .pipe(
            map(pzza => new fromPizzaAction.UpdatePizzaSuccess(pzza)),
            catchError(err => of(new fromPizzaAction.UpdatePizzaFail(err)))
          );
      })
    );
}
