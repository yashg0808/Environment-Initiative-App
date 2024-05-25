import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler";

class ApiRequest {
  constructor(url) {
    this.url = url;
  }

  async getRequest(queryParams = {}, headers = {}) {
    return await asyncHandler(async () => {
      const response = await axios.get(this.url, {
        params: queryParams,
        headers: headers,
      });
      return response.data;
    });
  }

  async postRequest(body, headers = {}) {
    return await asyncHandler(async () => {
      const response = await axios.post(this.url, body, { headers: headers });
      return response.data;
    });
  }

  async putRequest(body, headers = {}) {
    return await asyncHandler(async () => {
      const response = await axios.put(this.url, body, { headers: headers });
      return response.data;
    });
  }

  async deleteRequest(headers = {}) {
    return await asyncHandler(async () => {
      const response = await axios.delete(this.url, { headers: headers });
      return response.data;
    });
  }

  async patchRequest(body, headers = {}) {
    return await asyncHandler(async () => {
      const response = await axios.patch(this.url, body, { headers: headers });
      return response.data;
    });
  }
}

export default ApiRequest;
