import axios from "../utils/Axios/axiosCustomize";

const getPostType = (idPost) => {
    return axios.get(`api/v1/post-type/${idPost}`);
}

const searchPosts = (page, limit, textSearch) => {
    return axios.get(`api/v1/search-posts?page=${page}&limit=${limit}&textSearch=${textSearch}`);
}

export {
    getPostType, searchPosts
};