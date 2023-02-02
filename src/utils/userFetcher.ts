import { TNewUser, TUser } from "./../types/apiTypes";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosinstance";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const userFetcher = {
  getUsers: async () => {
    try {
      const response = await axiosInstance.get<Omit<TUser, "password">[]>(
        "/users"
      );
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
  getUserById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
  updateUserById: async (id: string, data: Omit<TUser, "password">) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
  deleteUserById: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
};

export default userFetcher;
