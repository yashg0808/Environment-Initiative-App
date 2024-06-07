import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class PostService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/post";
    }

    async getPosts(pageNo, limit) {
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
}

export default new PostService();