/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
import Cookies from 'js-cookie';

import type { IEndpointProvider, IMethod } from '@/interfaces';

import { ApiVersions, HttpMethods } from '../constants';
import { handleLoading } from '../redux/Reducer';
import { store } from '../redux/Store/store';

export const queryOf = (params: Record<string, string> = {}): string => {
  return new URLSearchParams(params).toString();
};
export const isJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
const callApi = async <T, K>(
  method: IMethod,
  url: string,
  payload: K | null,
  base: IEndpointProvider,
): Promise<T> => {
  let baseURL = '';
  switch (base) {
    case ApiVersions.V1:
      baseURL = process.env.REACT_APP_BASE_URL!;
      break;
    case ApiVersions.MOCK:
      baseURL = process.env.NEXT_PUBLIC_MOCK_API!;
      break;
    default:
      break;
  }
  const api = `${baseURL}${url}`;
  const headers: { [x: string]: string } = {
    'Content-Type': 'application/json',
  };
  // const token = localStorage.getItem('token')
  const token = Cookies.get('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options: RequestInit = {
    method: method || HttpMethods.GET,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
  if (
    [HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH].includes(
      method as HttpMethods,
    )
  ) {
    options.body = JSON.stringify(payload ?? {});
  }
  store.dispatch(handleLoading());
  const response: Response = await fetch(api, options);
  if (!response?.ok) {
    store.dispatch(handleLoading());
    const text = await response.text();
    return (JSON.parse(text) ?? text) as T;
  }
  store.dispatch(handleLoading());
  return response.json();
};
export const apiService = {
  get: <T, K = {}>(url: string, base: IEndpointProvider = ApiVersions.V1) =>
    callApi<T, K>(HttpMethods.GET, url, null, base),
  post: <T, K>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.POST, url, payload, base),
  patch: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.PATCH, url, payload, base),
  put: <T, K = Record<string, string | number>>(
    url: string,
    payload: K,
    base: IEndpointProvider = ApiVersions.V1,
  ) => callApi<T, K>(HttpMethods.PUT, url, payload, base),
  delete: <T, K = {}>(url: string, base: IEndpointProvider = ApiVersions.V1) =>
    callApi<T, K>(HttpMethods.DELETE, url, null, base),
};
