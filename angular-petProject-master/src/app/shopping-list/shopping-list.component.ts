import { Ingredient } from './../shared/iggredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shoppin-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igChangeSub: Subscription;
  sum: Observable<any>
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppinglist')
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // )
  this.sum =  this.ingredients.pipe(
      reduce(
        (acc,ingredients, index)=>{
           return  acc + ingredients.ingredients[index].amount
        }, 0
      )
    )
    // console.log(this.sum)
  }

  OnEditItem(index: number) {
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.startEdit(index))
  }


  ngOnDestroy() {
    //  this.igChangeSub.unsubscribe();
  }
}
