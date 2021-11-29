import { OplataComponent } from './../oplata/oplata.component';

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [
        OplataComponent
    ],
    imports: [SharedModule, FormsModule, RouterModule.forChild([
        { path: '', component: OplataComponent }
    ])]
})

export class OplataModule {

}
