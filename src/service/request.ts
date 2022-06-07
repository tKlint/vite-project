import { notification } from 'antd';
import { extend, RequestOptionsInit, ResponseError } from 'umi-request';

interface ResponseType<T = unknown> {
    code: number;
    message: string;
    subCode: number;
    subMessage: string;
    data: T;
}

enum CodeMessage {
	'请求成功' = 200,
	'删除成功' = 204,
	'服务器发生错误，请检查服务器' = 500,
	'用户没有权限（令牌、用户名、密码错误）' = 401,
	'请求的格式不可得' = 406
}

const errorHandler = (error: ResponseError<any>): Response => {
	console.log('handle')
	const { response, name, message, request } = error;
	if (response && response.status) {
		// const errorText = CodeMessage[response.status] || response.statusText;
		// const { status, url } = response;
		// notification.error({
		// 	message: `请求错误 ${status}: ${url}`,
		// 	description: errorText,
		// });
	} else if (!response) {
		notification.error({
			message: `${name}: ${message}`,
			description: `${request.url}`,
			// duration: 0,
		})
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
		'access-token': localStorage.getItem("access-token") || ''
	};
	return {
		url,
		options: {
			...options,
			headers: headers
		}
	};
});

request.interceptors.response.use((response, RequestOptionsInit) => response);

const requestInstance = <T = any>(url: string, options: RequestOptionsInit):  Promise<ResponseType<T>> => {
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
}

export default requestInstance;