import { createSlice, CaseReducer, createAsyncThunk } from '@reduxjs/toolkit';
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
    updateTimestamp?: number;
}

type LoginReducer = {
    [k in Reducers]: CaseReducer<
        LoginState,
        {
            payload: LoginState;
            type: string;
        }
    >;
};

export const userLogin = createAsyncThunk<LoginState, LoginData>(
    'users/login',
    async (loginData: LoginData) => {
        const response = await API['/USER/LOGIN_POST'](loginData);
        const { data, code, message, subMessage } = response;

        if (code === 200) {
            return {
                status: LoginStatus.OK,
                accessToken: data.accessToken,
                updateTimestamp: new Date().getTime()
            };
        }
        return {
            status: LoginStatus.ERROR,
            accessToken: '',
            message,
            subMessage,
            updateTimestamp: new Date().getTime()
        };
    }
);

const loginReducer = createSlice<LoginState, LoginReducer, 'login'>({
    name: 'login',
    initialState: {
        loading: false
    },
    reducers: {
        [Reducers.LOGIN]: (state) => state,
        [Reducers.LOGOUT]: () => {
            localStorage.removeItem('access-token');
            return { status: LoginStatus.ERROR, token: '' };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.loading = true;
        });
        // 接口请求返回
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            return {
                accessToken: payload.accessToken,
                message: payload.message,
                status: payload.status,
                subMessage: payload.subMessage,
                updateTimestamp: new Date().getTime()
            };
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.loading = false;
        });
    }
});
export const { login, logout } = loginReducer.actions;
export default loginReducer.reducer;
