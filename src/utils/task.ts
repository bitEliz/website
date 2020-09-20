import axios, { Method } from "axios";
import { baseURL } from "@/config/env";

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000, // request timeout
});

const http = async (
  url = "",
  method: Method = "GET",
  data = {},
  headers = {}
) => {
  try {
    const response = await service.request({
      url,
      method,
      data,
      headers,
    });

    return new Promise((resolver) => resolver(response.data));
  } catch (error) {
    throw new Error(error);
  }
};

export default http;