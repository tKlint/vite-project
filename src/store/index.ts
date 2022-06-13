import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, AnyAction } from "redux";
import loginReducer, { LoginState } from "./login";
import userReucer, { UserState } from './user'
const rootReduce = combineReducers<{
    loginReducer: LoginState;
    userReucer: UserState;
}, AnyAction>({
    loginReducer,
    userReucer
});

const store = configureStore({
    reducer: rootReduce
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;