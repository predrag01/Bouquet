import { createReducer, on } from "@ngrx/store";
import { getToken, getUser, getUserId } from "src/app/auth/user-context";
import { User } from "src/app/models/user";
import * as UserActions from './user.actions'
import { EntityState, createEntityAdapter } from "@ngrx/entity";

export interface UserState extends EntityState<User> {
    user: User | null;
    access_token: string | null;
};

const adapter = createEntityAdapter<User>()

export const initialState: UserState = adapter.getInitialState({
    access_token: getToken(),
    user: getUser(),
  });
  
  export const userReducer = createReducer(
    initialState,
    on(UserActions.loginUserSuccess, (state, {user}) => 
      adapter.addOne(user.user, {
        ...state,
        access_token: user.accessToken,
        user: user.user
      })
    ),
    on(UserActions.logout, (state ) => ({
      ...adapter.removeAll(state),
      user: null,
      access_token: null
    })),
    on(UserActions.updateProfileSuccess, (state, {user}) => ({
      ...state,
      user:user,
    })),
  );