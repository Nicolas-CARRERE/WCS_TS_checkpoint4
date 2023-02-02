import { TVehicleBrand, TNewVehicleBrand } from "./../types/apiTypes";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosinstance";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const brandFetcher = {
  createBrand: async (data: TNewVehicleBrand) => {
    try {
      const response = await axiosInstance.post("/brands", data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getBrands: async () => {
    try {
      const response = await axiosInstance.get<TVehicleBrand[]>("/brands");
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  getBrandById: async (id: string) => {
    try {
      const response = await axiosInstance.get(`/brands/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  updateBrandById: async (id: string, data: Omit<TVehicleBrand, "id">) => {
    try {
      const response = await axiosInstance.put(`/brands/${id}`, data);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },

  deleteBrandById: async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/brands/${id}`);
      return responseBody(response);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  },
};

export default brandFetcher;
