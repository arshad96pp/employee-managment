import axios from "axios";
import { data } from "react-router-dom";


export const baseUrl = axios.create({
  baseURL: 'https://test.pixbit.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
})


export const loginApi = (data: any) => baseUrl.post('/login', data)

export const registerApi = (data: any) => baseUrl.post(`/register`, data)

export const AddDesignationApi = (data: any, token: String) =>
  baseUrl.post(`/designations`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const AddEmployeeApi = (data: any, token: String) =>
    baseUrl.post(`/employees `, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });


