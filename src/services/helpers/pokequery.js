import api from "../api";
import to from "await-to-js";

const pokeRequests = {
  fetchPokemonsPaginated: async (queryData) => {
    let resourceString = `${queryData.resource}?offset=${queryData.pagination.offset}&limit=${queryData.pagination.limit}`;

    let [error, response] = await to(api.GET(resourceString));
    if (error) {
      throw { ...response };
    } else {
      return response;
    }
  },
  fetchAll: async (queryData) => {
    let resourceString = `${queryData.resource}`;

    let [error, response] = await to(api.GET(resourceString));
    if (error) {
      throw { ...response };
    } else {
      return response;
    }
  },
  fetchOne: async (queryData) => {
    let resourceString = `${queryData.resource}/${queryData.keyword}`;

    let [error, response] = await to(api.GET(resourceString));
    if (error) {
      throw { ...response };
    } else {
      return response;
    }
  },
  fetchFromUrl: async (url) => {
    let [error, response] = await to(api.GET_URL(url));
    if (error) {
      throw { ...response };
    } else {
      return response;
    }
  },
};

export default pokeRequests;
