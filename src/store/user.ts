import {
    createSlice,
    CaseReducer,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import API from '../service/api';

export interface UserState {
    uuid: string;
    nickName: string;
    avatarUrl: string;
    account: string;
}

enum Reducers {
    GET_USER = 'get_user_info',
}

type UerReducer = {
    [k in Reducers]: CaseReducer<UserState, {
        payload: UserState;
        type: string;
    }>;
};

export const fetchUser = createAsyncThunk<UserState, UserState[]>(
    'users/info',
    async () => {
        const response = await API['/USER/INFO_GET']();
        const { data, code, message, subMessage } = response;

        if (code === 200) {
            console.log(data, )
            return {
                ...data[0]
            }
        }
        return data[0]
    }
)

const userReducer = createSlice<UserState, UerReducer, 'user'>({
    name: 'user',
    initialState: {
        uuid: '',
        nickName: '',
        avatarUrl: '',
        account: '',
    },
    reducers: {
        [Reducers.GET_USER]: state => state,
    },
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            state.nickName = payload.nickName;
            state.avatarUrl = payload.avatarUrl;
            state.uuid = payload.uuid;
            state.account = payload.account;
        });
    }
})
export const { get_user_info } = userReducer.actions;
export default userReducer.reducer;