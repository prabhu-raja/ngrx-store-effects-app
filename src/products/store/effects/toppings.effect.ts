import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services/toppings.service';


@Injectable()
export class ToppingsEffects {

  constructor(
    private action$: Actions,
    private toppingsService: fromServices.ToppingsService) { }

  @Effect()
  loadToppings$ = this.action$
    .ofType(toppingsActions.LOAD_TOPPINGS)
    .pipe(
      switchMap(() => {
        return this.toppingsService.getToppings()
          .pipe(
            map(arrToppings => new toppingsActions.LoadToppingsSuccess(arrToppings)),
            catchError(err => of(new toppingsActions.LoadToppingsFail(err)))
          )
      })
    );
}
