import { TVehicle, TNewVehicle } from "./../types/apiTypes";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosinstance";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const vehicleFetcher = {
  createVehicle: async (data: TNewVehicle) => {
    try {
      const response = await axiosInstance.post("/vehicles", data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getVehicles: async () => {
    try {
      const response = await axiosInstance.get<TVehicle[]>("/vehicles");
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getVehicleById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/vehicles/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  updateVehicleById: async (id: string, data: Omit<TVehicle, "id">) => {
    try {
      const response = await axiosInstance.put(`/vehicles/${id}`, data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  deleteVehicleById: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/vehicles/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
};

export default vehicleFetcher;
