import axios from "axios";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000, // request timeout
});

export default async (url = "", method = "get", data = {}, headers = {}) => {
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
