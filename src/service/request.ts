import { Modal, notification } from 'antd';
import { extend, RequestOptionsInit, ResponseError } from 'umi-request';

export interface ResponseType<T = object> {
    code: number;
    message: string;
    subCode: number;
    subMessage: string;
    data: T;
}

interface CodeHandle {
    [key: number]: () => void;
    ['*']: (code: number) => void;
}
const codeMessage: {
    [key: number]: string;
} = {
    200: '请求成功',
    204: '删除成功',
    500: '服务器发生错误，请检查服务器',
    401: '用户没有权限（令牌、用户名、密码错误）',
    406: '请求的格式不可得'
};

const accessTokenExprie = () => {
    Modal.error({
        title: '授权过期',
        content: '授权超过7天, 请重新登录!',
        onOk() {
            localStorage.removeItem('access-token');
            window.location.href = '/login';
        },
        afterClose() {
            // console.log('first')
        }
    });
};
const codeHandle: CodeHandle = {
    401: accessTokenExprie,
    '*': function (code: number) {
        console.warn('未知的error code:', code);
    }
};
// const freeApis = ['/api/login', '/api/sendCapcha', '/api/register'];

const errorHandler = (error: ResponseError<any>): Response => {
    const { response, name, message, request } = error;
    if (response && response.status) {
        // respose suceess
    } else if (!response) {
        notification.error({
            message: `${name}: ${message}`,
            description: `${request.url}`
            // duration: 0,
        });
    }
    return response;
};

const request = extend({
    prefix: '/api',
    timeout: 3000,
    errorHandler,
    credentials: 'include'
});

request.interceptors.request.use((url, options) => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'access-token': localStorage.getItem('access-token') || ''
    };
    return {
        url,
        options: {
            ...options,
            headers
        }
    };
});

const interceptJSONData = async (response: Response) => {
    const { code, message } = (await response.clone().json()) as ResponseType;
    if (code !== 200) {
        notification.error({
            message: `${codeMessage[code]}${code}`,
            description: message
        });
        if (Object.keys(codeHandle).includes(`${code}`)) {
            codeHandle[code]();
        } else {
            codeHandle['*'](code);
        }
    }
};

request.interceptors.response.use((response) => {
    const contentType = response.headers.get('content-type');
    switch (contentType) {
        case 'application/json; charset=utf-8':
            interceptJSONData(response);
            break;
        default:
            break;
    }
    return response;
});

const requestInstance = <T extends object>(
    url: string,
    options: RequestOptionsInit
): Promise<ResponseType<T>> => {
    const method = options.method || 'GET';
    switch (method) {
        case 'GET':
            return request.get(url, options);
        case 'POST':
            return request.post(url, options);
        case 'PUT':
            return request.put(url, options);
        case 'DELETE':
            return request.delete(url, options);
        default:
            throw new Error('RESULTFUL ERROR: INVALID METHOED');
    }
};

export default requestInstance;
