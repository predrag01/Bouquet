import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "src/app/services/user.service";
import * as UserActions from './user.actions'
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginUser, User } from "src/app/models/user";
import { setToken, setUser } from "src/app/auth/user-context";

@Injectable()
export class UserEffects {
    
    constructor(
        private actions$ :Actions,
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}
    
    registerUser$ = createEffect( () =>
        this.actions$.pipe(
            ofType(UserActions.registerUser),
            mergeMap(({user}) => this.userService.register(user).pipe(
                map(() => {
                    this.snackBar.open('Successfully register.', 'Ok');
                    this.router.navigate(['login'], {replaceUrl: true});
                    return UserActions.registerUserSuccess();
                }),
                catchError(({error}) => {
                    this.snackBar.open(error.message, 'Ok', {duration: 5000});
                    return of(UserActions.registerUserFailuer());
                })
            ))
        )
    );

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loginUser),
            mergeMap(({email, password}) => this.userService.login(email, password).pipe(
                map((user: LoginUser) => {
                    setToken(user.accessToken);
                    setUser(user.user);
                    this.router.navigate(['home'], {replaceUrl: true});
                    return UserActions.loginUserSuccess({ user });
                }),
                catchError(({error}) => {
                    this.snackBar.open(error.message, 'Ok', {duration: 5000});
                    setToken(null);
                    setUser(null);
                    return of(UserActions.loginUserFailuer({ error: 'BadCredentials'}));
                })
            ))
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logout),
            mergeMap(() => {
                setToken(null);
                setUser(null);
                this.router.navigate(['home'], {replaceUrl: true});
                return of({type: 'loggedout'});
            })
    ));

    updateProfile$ = createEffect(() =>
    this.actions$.pipe(
        ofType(UserActions.updateProfile),
        mergeMap(({ user }) => this.userService.update(user).pipe(
            map((updatedUser: User) => {
            this.snackBar.open("Profile successfully updated", "Ok", {duration: 3000});
            setUser(updatedUser);
            return UserActions.updateProfileSuccess({ user: updatedUser });
            }),
            catchError( ({error}) => {
                this.snackBar.open(error.message, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ))
};