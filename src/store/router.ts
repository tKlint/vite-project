import { createSlice, CaseReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { RouteResponse } from '@/service/typing.d';
import API from '../service/api';
// import { router } from '../routers/router';

export interface RouterState {
    routes: RouteResponse[];
}

enum Reducers {
    FETECH_ROUTES = 'fetechRoutes'
}

type RouterReducer = {
    [k in Reducers]: CaseReducer<
        RouterState,
        {
            payload: RouterState;
            type: string;
        }
    >;
};

export const fetchRoutes = createAsyncThunk<RouterState>('router/info', async () => {
    const response = await API['/USER/ROUTES']();
    const router = response;
    return {
        routes: router
    };
});

const userReducer = createSlice<RouterState, RouterReducer, 'router'>({
    name: 'router',
    initialState: {
        routes: []
    },
    reducers: {
        [Reducers.FETECH_ROUTES]: (state) => state
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoutes.fulfilled, (state, { payload }) => {
            return {
                routes: payload.routes
            };
        });
    }
});
export const { fetechRoutes } = userReducer.actions;
export default userReducer.reducer;
