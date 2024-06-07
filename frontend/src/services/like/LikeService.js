import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class LikeService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/like";
        this.GOOGLE_LOGIN_REDIRECT_URL = "/api/v1/users/google";
    }
    async likePostService(postId)  {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/post/${postId}`);
        const response = await apiRequest.postRequest({});
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        }   else if (response instanceof ApiResponse) { 
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

}

export default new LikeService();