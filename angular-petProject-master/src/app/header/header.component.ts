import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) { }

  private userSubscription: Subscription;
  isAthenticated = false;

  ngOnInit() {
    this.userSubscription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAthenticated = !!user;
    });
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes())
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes())
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.logout())
  }

}
