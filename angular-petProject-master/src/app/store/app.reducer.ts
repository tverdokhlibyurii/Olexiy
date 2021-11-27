import { Action, ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';

export interface AppState {
    shoppinglist: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppinglist: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.AuthReducer,
    recipes: fromRecipes.RecipeReducer
}