import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthIntereptorService } from './auth/auth-interseptor.service';
@NgModule({

    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthIntereptorService, multi: true }],
})
export class CoreModule { }
