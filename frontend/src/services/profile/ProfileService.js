import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class ProfileService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/profile";
        this.FOLLOW_UNFOLLOW_USER_URL = "/api/v1/follow";
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
    async getProfileByUsername(username) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/u/${username}`);

        const response = await apiRequest.getRequest();

        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    async followUnFollowUser(userId) {
        const apiRequest = new ApiRequest(`${this.FOLLOW_UNFOLLOW_USER_URL}/${userId}`);

        const response = await apiRequest.postRequest();

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