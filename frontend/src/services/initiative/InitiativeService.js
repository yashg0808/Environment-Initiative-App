import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class InitiativeService{
    constructor() {
        this.USER_BASE_URL = "/api/v1/initiative";
        this.SUPPORT_BASE_URL = "/api/v1/support";
    }
    async getInitiatives(pageNo, limit) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}?page=${pageNo}&limit=${limit}`);
        const response = await apiRequest.getRequest();
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    async getInitiativeById(initiativeId) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/${initiativeId}`);
        const response = await apiRequest.getRequest();
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    async getSupporters(initiativeId) {
        const apiRequest = new ApiRequest(`${this.SUPPORT_BASE_URL}/${initiativeId}/supporters`);
        const response = await apiRequest.getRequest();
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
}

export default new InitiativeService();