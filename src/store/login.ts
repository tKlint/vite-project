import {
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