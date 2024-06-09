import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class BookMarkService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/bookmark";
    }

    async BookMarkPost(postId) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/${postId}`);
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

export default new BookMarkService();