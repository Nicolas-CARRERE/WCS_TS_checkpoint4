import { TVehicleModel, TNewVehicleModel } from "./../types/apiTypes";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosinstance";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const modelFetcher = {
  createModel: async (data: TNewVehicleModel) => {
    try {
      const response = await axiosInstance.post("/models", data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getModels: async () => {
    try {
      const response = await axiosInstance.get<Omit<TVehicleModel, "users">[]>(
        "/models"
      );
      console.log(responseBody(response));
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getModelById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/models/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  updateModelById: async (id: string, data: Omit<TVehicleModel, "id">) => {
    try {
      const response = await axiosInstance.put(`/models/${id}`, data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  deleteModelById: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/models/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
};

export default modelFetcher;
