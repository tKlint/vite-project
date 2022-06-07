// import { Reducer } from "react";
// // import { AnyAction } from "redux";

// enum LoginReducerActions {
//     LOGOUT = 'logout',
//     LOGINT = 'login',
// }


export enum LoginStatus {
    OK = 'ok',
    ERROR = 'error'
}

export interface LoginState {
    status?: LoginStatus;
    accessToken?: string;
    message?: string;
    subMessage?: string;
    loading?: boolean;
}
// interface LoginAction extends AnyAction {
//     type: LoginReducerActions;
//     paylod: LoginState;
// }

// const initState:LoginState = {
//     status: undefined
// }

// type LoginReducer = Reducer<LoginState, LoginAction>;

// /**
//  * 登录
//  * @param state 上一个状态
//  * @param action 触发action
//  * @returns {LoginState}
//  */
// const login: LoginReducer = (state, action) => {
//     return {
//         ...state,
//         status: LoginStatus.OK,
//         token: action.paylod.token
//     }
// }

// /**
//  * 退出登录
//  * @param {LoginState} state 上一个状态
//  * @param {LoginAction} action 触发action
//  * @returns 
//  */
// const logout: LoginReducer = (state, action) => {
//     return {
//         ...state,
//         status: LoginStatus.OK,
//         token: action.paylod.token
//     }
// }

// const loginReducer: LoginReducer = (state = initState, action) => {
//     switch (action.type) {
//         case LoginReducerActions.LOGINT:
//             return login(state, action);
//         default:
//             return state
//     }
// }

// export default loginReducer;


import {
    createAction,
    createReducer,
    AnyAction,
    PayloadAction,
    createSlice,
    CaseReducer,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { LoginData } from '../pages/login';
import API from '../service/api';

enum Reducers {
    LOGIN = 'login',
    LOGOUT = 'logout'
}

type LoginReducer = {
    [k in Reducers]: CaseReducer<LoginState, {
        payload: LoginState;
        type: string;
    }>;
};

export const userLogin = createAsyncThunk<LoginState, LoginData>(
    'users/login',
    async (loginData: LoginData) => {
        const response = await API['/USER/LOGIN_POST'](loginData);
        const { data, code, message, subMessage } = response;

        if (code === 200) {
            return {
                status: LoginStatus.OK,
                accessToken: data.accessToken
            }
        }
        return {
            status: LoginStatus.ERROR,
            accessToken: '',
            message,
            subMessage
        }
    }
)

const loginReducer = createSlice<LoginState, LoginReducer, 'login'>({
    name: 'login',
    initialState: {
        loading: false
    },
    reducers: {
        [Reducers.LOGIN]: state => state,
        [Reducers.LOGOUT]: state => ({ status: LoginStatus.ERROR, token: '' }),
    },
    extraReducers: builder => {
        builder.addCase(userLogin.pending, (state, action) => {
            state.loading = true;
        });
        // 接口请求返回
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.accessToken = payload.accessToken;
            state.message = payload.message;
            state.status = payload.status;
            state.subMessage = payload.subMessage;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
        });
    }
})
export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;