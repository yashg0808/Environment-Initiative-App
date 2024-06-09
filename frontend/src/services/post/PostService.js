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

    async createPost(content,tags,imgs) {
        console.log("In Create Post Service")
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/`);
        const formData = new FormData();
        formData.append('content', content);
        tags.forEach((tag) => {
            formData.append(`tags`, tag);
        });
        for(let i=0;i<imgs.length;i++){
            formData.append('images', imgs[i].file);
        }
        const response = await apiRequest.postRequest(formData, {
            'Content-Type': 'multipart/form-data',
        });
        if (response instanceof ApiResponse && response.success) {
            return response.data;
        } else if (response instanceof ApiResponse) {
            return new ApiError(response.message);
        } else {
            return response;
        }
    }

    async getPostsByUser(username) {
        const apiRequest = new ApiRequest(`${this.USER_BASE_URL}/get/u/${username}`);
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