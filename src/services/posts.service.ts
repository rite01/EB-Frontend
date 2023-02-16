/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IPost } from '@/interfaces';

import { ApiVersions, USER } from '../constants';
import { apiService } from './api.service';

/**
 * @description Get all posts
 * @param {}
 * @return {IPost[]}
 * @url /posts
 */
export const getEmployeeData = (): Promise<IPost[]> => {
  return apiService.get<IPost[], object>(USER.ALL_USERS, ApiVersions.V1);
};
export const getDepartmentData = (): Promise<any> => {
  return apiService.get<IPost[], object>(USER.GET_DEPARTMENT, ApiVersions.V1);
};
export const getBranchData = (): Promise<any> => {
  return apiService.get<IPost[], object>(USER.GET_BRANCH, ApiVersions.V1);
};
export const deleteUser = (id: number): Promise<any> => {
  return apiService.delete<IPost[], object>(
    `${USER.DELETE_USER}/${id}`,
    ApiVersions.V1,
  );
};
export const loginUser = (userData: any): Promise<IPost[]> => {
  return apiService.post<IPost[], object>(
    USER.LOGIN_USER,
    userData,
    ApiVersions.V1,
  );
};
export const uploadFile = (file: any): Promise<IPost[]> => {
  return apiService.post<IPost[], object>(
    USER.UPLOAD_FILE,
    file,
    ApiVersions.V1,
  );
};
