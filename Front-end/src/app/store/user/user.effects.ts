import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class UserEffects {
    
    constructor(private actions$ :Actions, private userService: UserService) {}
    
}