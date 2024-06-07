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
        const apiRequest = new ApiRequest(this.USER_BASE_URL);
        const images = []
        console.log("Content:",content)
        console.log("Tags:",tags)
        imgs.forEach(image => {
            images.push(image.file)
        });
        console.log("Images:",images)
        const response = await apiRequest.postRequest({
            content,
            tags,
            images
        }, {
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
}

export default new PostService();