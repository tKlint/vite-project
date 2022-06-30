import { RequestOptionsInit } from 'umi-request';
import { LoginData } from '../pages/login';
import { RegisterStatus } from '../pages/login/register';
import { UserState } from '../store/user';
import request from './request';

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
        })
};
export default API;
