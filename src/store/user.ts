import { createSlice, CaseReducer, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../service/api';

export interface UserState {
    uuid: string;
    nickName: string;
    avatarUrl: string;
    account: string;
}

enum Reducers {
    GET_USER = 'getUserInfo'
}

type UerReducer = {
    [k in Reducers]: CaseReducer<
        UserState,
        {
            payload: UserState;
            type: string;
        }
    >;
};

export const fetchUser = createAsyncThunk<UserState>('users/info', async () => {
    const response = await API['/USER/INFO_GET']();
    const { data, code, message, subMessage } = response;

    if (code === 200) {
        return {
            ...data[0]
        };
    }
    return data[0];
});

const userReducer = createSlice<UserState, UerReducer, 'user'>({
    name: 'user',
    initialState: {
        uuid: '',
        nickName: '',
        avatarUrl: '',
        account: ''
    },
    reducers: {
        [Reducers.GET_USER]: (state) => state
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            // eslint-disable-next-line no-param-reassign
            state.nickName = payload.nickName;
            // eslint-disable-next-line no-param-reassign
            state.avatarUrl = payload.avatarUrl;
            // eslint-disable-next-line no-param-reassign
            state.uuid = payload.uuid;
            // eslint-disable-next-line no-param-reassign
            state.account = payload.account;
        });
    }
});
export const { getUserInfo } = userReducer.actions;
export default userReducer.reducer;
