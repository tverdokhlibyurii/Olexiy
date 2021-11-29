import { Action } from '@ngrx/store'
import { Ingredient } from 'src/app/shared/iggredient.model';

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENTS = '[Shopping List] UPDATE_INGREDIENTS';
export const DELETE_INGREDIENTS = '[Shopping List] DELETE_INGREDIENTS';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export class addIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) { }
}

export class addIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) { }
}

export class updateIngredient implements Action {
    readonly type = UPDATE_INGREDIENTS;

    constructor(public payload: Ingredient) { }
}

export class deleteIngredient implements Action {
    readonly type = DELETE_INGREDIENTS;
}

export class startEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) { }
}


export class stopEdit implements Action {
    readonly type = STOP_EDIT;

}



export type ShoppingListActions =
    addIngredient
    | addIngredients
    | updateIngredient
    | deleteIngredient
    | startEdit
    | stopEdit
