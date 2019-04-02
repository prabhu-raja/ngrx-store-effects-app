import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <pizza-item *ngFor="let pizza of (pizzas$ | async)" [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  // constructor(private pizzaService: PizzasService) {}

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   this.pizzas = pizzas;
    // });

    // this.store.select<any>('products').subscribe((objState: any) => console.log('🇨🇦', objState));
    /*
    this.store
      .select<any>(fromStore.getAllPizzas)
      .subscribe((objState: any) => {
        console.log('🐍', objState);
        this.pizzas = objState;
      });
      */

    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
  }
}
