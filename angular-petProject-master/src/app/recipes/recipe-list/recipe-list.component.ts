import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../../recipes/recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  searchInput:string;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(map(recipesState => {
        return recipesState.recipes
      }))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes
      })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
