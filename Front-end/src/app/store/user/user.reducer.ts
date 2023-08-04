import { createReducer } from "@ngrx/store";
import { getToken, getUser } from "src/app/auth/user-context";
import { User } from "src/app/models/user";

export interface UserState {
    user: User | null;
    access_token: string | null;
    loading: boolean;
};

export const initialState: UserState = {
    user: getUser(),
    access_token: getToken(),
    loading: false,
  };
  
  export const userReducer = createReducer(
    initialState,
  );