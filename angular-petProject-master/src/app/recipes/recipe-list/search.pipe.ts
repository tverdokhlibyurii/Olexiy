import { Recipe } from './../recipe.model';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'search'
})
export class SearchPipe implements PipeTransform {
    transform(languages: Recipe[], searchInput: string): any[]{
        if(!searchInput) {
            return  [];
        }
searchInput = searchInput.toLowerCase();
       return languages.filter(
           x =>x.name.includes(searchInput)
       )
     }
}
