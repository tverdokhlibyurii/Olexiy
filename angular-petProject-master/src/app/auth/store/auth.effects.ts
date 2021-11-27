import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const handleauthentiction = (expiresIn: number, email: string, userId: string, token: string) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user))
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    });
}

const handleError = (errorRes: any) => {
    let errorMessage = 'Unknown error occured!'
    if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage))
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This mail already exist!';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = "Email not found";
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Your password is invalid';
            break;
    }
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {
    authSignUp = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAction: AuthActions.SignUpStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
                    {
                        email: signupAction.payload.email,
                        password: signupAction.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleauthentiction(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    )



    AuthLogin = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.loginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap(resData => {
                        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                    }),
                    map(resData => {
                        return handleauthentiction(+resData.expiresIn, resData.email, resData.localId, resData.idToken)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    )


    authRedirect = createEffect(
        () => this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
                if ((authSuccessAction.payload.redirect)) {
                    this.router.navigate(['/'])
                }
            })),
        { dispatch: false }
    )

    authLogout = createEffect(
        () => this.actions$.pipe(ofType(AuthActions.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('UserData');
                this.router.navigate(['/auth'])
            }
            )),
        { dispatch: false }
    )
    autologin = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _expirationDate: Date;
                } = JSON.parse(localStorage.getItem('UserData'));
                if (!userData) {
                    return { type: 'Dummy' };
                }
                const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));

                if (loadedUser.token) {
                    // this.user.next(loadedUser);
                    const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return new AuthActions.AuthenticateSuccess({
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._expirationDate),
                        redirect: false
                    })
                    // const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
                    // this.autologout(expirationDuration);
                }
                return { type: 'Dummy' };
            })
        )
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) { }
}

