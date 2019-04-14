import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ | async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(
    private pizzaService: PizzasService,
    private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    /*
    * Transformation 1
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
    */

    /*
    * Transformation 2
    this.store.select<any>('products').subscribe(res => {
      console.log('TCL: ProductsComponent -> ngOnInit -> res', res);
    })
    */

    /*
     * Transformation 3
    this.store.select(fromStore.getAllPizzas).subscribe(res => {
      console.log('TCL: ProductsComponent -> ngOnInit -> res ⏰⏰⏰', res);
      this.pizzas = res;
    });
    */

    this.pizzas$ = this.store.select(fromStore.getAllPizzas);

  }
}
