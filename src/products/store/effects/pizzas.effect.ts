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
  loadPizzas$ = this.actions$
    .ofType(fromPizzaAction.LOAD_PIZZAS)
    .pipe(
      switchMap(() => {
        return this.pizzasService.getPizzas()
          .pipe(
            map(pizzas => new fromPizzaAction.LoadPizzasSuccess(pizzas)),
            catchError(err => of(new fromPizzaAction.LoadPizzasFail(err)))
          );
      })
    );
}
