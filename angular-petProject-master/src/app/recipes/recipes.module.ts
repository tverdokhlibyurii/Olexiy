import { CommonModule } from '@angular/common';
import { SearchPipe } from './recipe-list/search.pipe';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipesComponent } from "./recipes.component";
import { StartRecipeComponent } from "./start-recipe/start-recipe.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        StartRecipeComponent,
        SearchPipe
    ],
    imports: [
      RouterModule,
      SharedModule,
      ReactiveFormsModule,
      RecipeRoutingModule,
      FormsModule
    ]
})

export class RecipesModule {

}
