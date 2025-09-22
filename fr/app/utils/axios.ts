import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from 'axios';

import toast from 'react-hot-toast';
 

import { getStorage } from './helper';
// Base URL configuration
const baseURL = process.env.NEXT_PUBLIC_HOST_URL;

if (!baseURL) {
    throw new Error('HOST_URL is not defined in environment variables.');
}
interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
  }
  
  // Error interface
  interface ApiError {
    message: string;
    status: number;
    details?: any;
  }
  
  
  const createAxiosClient = (): AxiosInstance => {
    const client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  



    // Request interceptor
    client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getStorage('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    // Response interceptor
    client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        const errorData = error.response?.data as any;
        // Log full error details for debugging
        console.error('API Error:', errorData);

        if (status === 401) {
          toast.error('Session expired. Please login again.');
          window.location.href = '/sign-in';
        }

        // Always reject the error as the API returns it (field: [msg, ...], ...)
        return Promise.reject(errorData || error);
      }
    );
  
    return client;
  };
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
const axiosClient = createAxiosClient();
const adminAxiosClient = adminCreateAxiosClient('application/json')
const axiosClientWithFiles = createAxiosClient();

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

// Generic request handler
const handleRequest = async <T>(request: Promise<AxiosResponse<T>>): Promise<ApiResponse<T>> => {
    try {
      const response = await request;
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText
      };
    } catch (error) {
      // Always throw the error as received from API (field: [msg, ...], ...)
      throw error;
    }
  };
  
  // HTTP request functions
  export const postRequest = async <T = any>(
    URL: string,
    payload?: object,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    return handleRequest<T>(axiosClient.post<T>(URL, payload, config));
  };

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
    
