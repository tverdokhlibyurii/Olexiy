import { Ingredient } from "../../shared/iggredient.model";
import * as  ShoppingListActions from "./shoppin-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [

    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function ShoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        default:
            return state;
    };
}
