import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromToppingsActions from '../actions/toppings.action';
import { ToppingsService } from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: ToppingsService) { }

  @Effect()
  loadToppings$ = this.actions$
    .ofType(fromToppingsActions.LOAD_TOPPINGS)
    .pipe(
      switchMap(() => {
        return this.toppingsService.getToppings()
          .pipe(
            map(toppings => new fromToppingsActions.LoadToppingsSuccess(toppings)),
            catchError(err => of(new fromToppingsActions.LoadToppingsFail(err)))
          )
      })
    )

}
