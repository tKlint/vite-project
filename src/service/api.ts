import { RequestOptionsInit } from "umi-request";
import { LoginData } from "../pages/login";
import request from "./request"



const API = {
    "/USER/LOGIN_POST": (data: LoginData, options: RequestOptionsInit = {}) => 
        request<{
            accessToken: string
        }>(`/login`, {
            data,
            method: "POST",
            ...options
        })
}
export default API;