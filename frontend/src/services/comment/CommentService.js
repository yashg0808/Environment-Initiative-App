import ApiError from "../ApiError";
import ApiRequest from "../ApiRequest";
import ApiResponse from "../ApiResponse";

class CommentService {
    constructor() {
        this.USER_BASE_URL = "/api/v1/comment";
      
    }

    async GetCommentService(postId)  {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/post/${postId}`);
        const response = await apiRequest.getRequest();
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        }   else if (response instanceof ApiResponse) { 
            return new ApiError(response.message);
        } else {
            return response;
        }
    }
    
    async addNewCommentService(postId,comment)  {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/post/${postId}`);
        const response = await apiRequest.postRequest({content:comment});
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        }   else if (response instanceof ApiResponse) { 
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

}

export default new CommentService();