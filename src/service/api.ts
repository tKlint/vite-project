import { RequestOptionsInit } from "umi-request";
import { LoginData } from "../pages/login";
import { UserState } from "../store/user";
import request from "./request"



const API = {
    "/USER/LOGIN_POST": (data: LoginData, options: RequestOptionsInit = {}) => 
        request<{
            accessToken: string
        }>(`/login`, {
            data,
            method: "POST",
            ...options
        }),
    "/USER/INFO_GET": (options: RequestOptionsInit = {}) => 
        request<UserState[]>(`/getUserInfo`, {
            method: "GET",
            ...options
        }),
}
export default API;