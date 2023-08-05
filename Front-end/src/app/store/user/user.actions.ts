import { createAction, props } from "@ngrx/store";
import { LoginUser, RegisterUser } from "src/app/models/user";

export const registerUser = createAction(
    'Register user',
    props<{user: RegisterUser}>()
);
export const registerUserSuccess = createAction('Register user success');
export const registerUserFailuer = createAction('Register user failuer');

export const loginUser = createAction(
    'Log in user',
    props<{email: string, password: string}>()
);
export const loginUserSuccess = createAction(
    'Login user success',
    props<{user: LoginUser}>()
);
export const loginUserFailuer = createAction(
    'Login user failuer',
    props<{ error: string }>()
);

export const logout = createAction('Log out');