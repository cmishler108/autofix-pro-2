import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

import { getStorage } from './helper';
// Base URL configuration
const baseURL = process.env.NEXT_PUBLIC_HOST_URL;

if (!baseURL) {
    throw new Error('HOST_URL is not defined in environment variables.');
}

// Function to create an Axios instance with default settings
function createAxiosClient(contentType: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            'Content-Type': contentType,
            Accept: contentType,
        },
    });

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getStorage('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    );

    return client;
}

// Function to create an Axios instance with default settings
function adminCreateAxiosClient(contentType: string): AxiosInstance {
    const client = axios.create({
        baseURL,
        timeout: 5000,
        headers: {
            'Content-Type': contentType,
            Accept: contentType,
        },
    });

    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = getStorage('admin-access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }
    );

    return client;
}

// Axios instances for different content types
const axiosClient = createAxiosClient('application/json');
const adminAxiosClient = adminCreateAxiosClient('application/json')
const axiosClientWithFiles = createAxiosClient('multipart/form-data');

// HTTP request functions
export function getRequest<T = any>(
    URL: string,
    params?: any,
    option?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return axiosClient.get<T>(URL, { params, ...option });
}

// HTTP request functions
export function adminGetRequest<T = any>(
    URL: string,
    params?: any,
    option?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    return adminAxiosClient.get<T>(URL, { params, ...option });
}

export function postRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return axiosClient.post<T>(URL, payload);
}

export function adminPostRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return adminAxiosClient.post<T>(URL, payload);
}

export function patchRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return axiosClient.patch<T>(URL, payload);
}

export function adminPatchRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return adminAxiosClient.patch<T>(URL, payload);
}

export function putRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return axiosClient.put<T>(URL, payload);
}

export function adminPutRequest<T = any>(
    URL: string,
    payload?: any
): Promise<AxiosResponse<T>> {
    return adminAxiosClient.put<T>(URL, payload);
}

export function deleteRequest<T = any>(URL: string): Promise<AxiosResponse<T>> {
    return axiosClient.delete<T>(URL);
}

export function adminDeleteRequest<T = any>(URL: string): Promise<AxiosResponse<T>> {
    return adminAxiosClient.delete<T>(URL);
}

export function postRequestWithFiles<T = any>(
    URL: string,
    payload: FormData
): Promise<AxiosResponse<T>> {
    return axiosClientWithFiles.post<T>(URL, payload);
}

export async function postRequestWithStream(
    URL: string,
    payload: any
): Promise<Response> {
    const token = getStorage('token');
    const response = await fetch(`${baseURL}/${URL}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: token || '',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
        throw new Error(response.statusText);
    }

    return response;
}
