import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class AuthService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/user";
        this.GOOGLE_LOGIN_REDIRECT_URL = "/api/v1/users/google";
    }

    async loginService(email, password) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/login`);
        const response = await apiRequest.postRequest({ email, password });
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async signUp(email, username, password) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/register`);
        const response = await apiRequest.postRequest({ email, username, password });
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async logoutService() {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/logout`);

        const response = await apiRequest.postRequest({});

        if (response instanceof ApiResponse && response.success) {
            return true;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    async getCurrentUser() {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/current-user`);

        const response = await apiRequest.getRequest();

        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async changePassword(fields) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/change-password`);

        const response = await apiRequest.postRequest({
            newPassword: fields.newPassword,
            oldPassword: fields.currentPassword,
        });

        if (response instanceof ApiResponse && response.success) {
            return true;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async forgotPassword(fields) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/forgot-password`);

        const response = await apiRequest.postRequest({ email: fields.email });

        if (response instanceof ApiResponse && response.success) {
            return response;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async resetForgottenPassword(token, fields) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/reset-password/${token}`);

        const response = await apiRequest.postRequest({ newPassword: fields.newPassword });

        if (response instanceof ApiResponse && response.success) {
            return response;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        }
        return response;
    }

    async refreshAccessToken() {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/refresh-token`);

        const response = await apiRequest.postRequest({});

        if (response instanceof ApiResponse && response.success) {
            return response;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        }
        return response;
    }
}

export default new AuthService();