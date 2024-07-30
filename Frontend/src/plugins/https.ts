import { axiosInstance } from "./axios";

export const GetRequest = (url: string = "", config: any = {}) => {
  return axiosInstance.get(url, config);
};
export const PostRequest = (url: string = "", config: any = {}) => {
  return axiosInstance.post(url, config);
};

export const PutRequest = (url: string = "", config: any = {}) => {
  return axiosInstance.put(url, config);
};
