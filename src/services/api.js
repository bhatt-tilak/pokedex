import axios from "axios";

// could be used later
export const APP_BASE_URL = "https://pokeapi.co/api/v2";

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("interceptor error", error);
    if (error.response && error.response.status === 401) {
      console.log("401 error", error.response.data);
      throw error.response.data;
    }
    if (error.response && error.response.status === 400) {
      console.log("400 error", error.response.data);
      throw error.response.data;
    }
    if (error.response && error.response.status === 404) {
      console.log("404 error", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
);

const api = {
  GET_URL: async (url) => {
    try {
      return await axios.get(url);
    } catch (error) {
      throw await error;
    }
  },
  GET: async (resource) => {
    try {
      return await axios.get(APP_BASE_URL + "/" + resource);
    } catch (error) {
      throw await error;
    }
  },
  POST: async (resource) => {
    try {
      return await axios.post(resource);
    } catch (error) {
      throw await error;
    }
  },
};

export default api;
