import { RequestOptionsInit } from 'umi-request';
import { PaginationParams } from '@/util/index.d';
import { SearchUserInfo } from '@/pages/contacts/components/index.d';
import jsonRoute from '@/mock/routes.json';
import { LoginData } from '../pages/login';
import { RegisterStatus } from '../pages/login/register';
import { UserState } from '../store/user';
import request from './request';
import { RouteResponse } from './typing.d';

const API = {
    '/USER/LOGIN_POST': (data: LoginData, options: RequestOptionsInit = {}) =>
        request<{
            accessToken: string;
        }>('/login', {
            data,
            method: 'POST',
            ...options
        }),
    '/USER/INFO_GET': (options: RequestOptionsInit = {}) =>
        request<UserState[]>('/getUserInfo', {
            method: 'GET',
            ...options
        }),
    '/USER/SEND_CAPTCHA_POST': (
        data: Pick<RegisterStatus, 'email'>,
        options: RequestOptionsInit = {}
    ) =>
        request<Pick<RegisterStatus, 'email'>[]>('/sendCapcha', {
            data,
            method: 'POST',
            ...options
        }),
    '/USER/REGISTER_POST': (data: RegisterStatus, options: RequestOptionsInit = {}) =>
        request<{
            account: string;
        }>('/register', {
            data,
            method: 'POST',
            ...options
        }),
    '/CONTACT/FETECH_CONTACT_LIST_GET': (
        params?: PaginationParams<FriendsListFieldType>,
        options: RequestOptionsInit = {}
    ) =>
        request<FriendsListFieldType[]>('/getContacts', {
            method: 'GET',
            params,
            ...options
        }),
    '/USER/SEARCH_USER_GET': (
        params: { keyword: string },
        options: RequestOptionsInit = {}
    ) =>
        request<SearchUserInfo[]>('/searchUser', {
            method: 'GET',
            params,
            ...options
        }),
    '/USER/SEND_CONTACT_REQUEST': (
        params: { targetUUID: string; verifyMessage?: string },
        options: RequestOptionsInit = {}
    ) =>
        request('/sendContactRequest', {
            method: 'POST',
            params,
            ...options
        }),
    '/USER/ROUTES': (options: RequestOptionsInit = {}) =>
        request<RouteResponse>('/routes', {
            method: 'GET',
            ...options
        })
};
export default API;
