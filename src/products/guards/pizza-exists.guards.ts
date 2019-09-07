import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, filter, switchMap, take } from 'rxjs/operators';
import * as fromStore from '../store';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const pizzaId = parseInt(route.params.pizzaId, 10);
        return this.hasPizza(pizzaId);
      })
    );
  }

  hasPizza(pizzaId: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzasEntities).pipe(
      map((entities: { [key: number]: Pizza }) => !!entities[pizzaId]),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap(isLoaded => {
        if (!isLoaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
