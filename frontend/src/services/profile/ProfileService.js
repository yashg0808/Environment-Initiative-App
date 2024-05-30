import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class ProfileService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/profile";
    }

    async updateService(name, bio, interests, phoneNumber, location) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/`);
        const response = await apiRequest.patchRequest({ name, bio, interests, phoneNumber, location });
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    async getProfile() {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/`);

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

export default new ProfileService();