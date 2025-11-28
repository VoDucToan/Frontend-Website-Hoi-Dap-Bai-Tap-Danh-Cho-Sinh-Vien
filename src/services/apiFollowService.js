import axios from "../utils/Axios/axiosCustomize";

const followPostByUser = (idUser, idPost) => {
    const data = {
        idUser, idPost
    }
    return axios.post(`api/v1/follow-post-by-user`, data);
}

const checkFollowPostByUser = (idUser, idPost) => {
    return axios.get(`api/v1/check-follow-post-by-user?idUser=${idUser}&idPost=${idPost}`);
}

const unFollowPostByUser = (idUser, idPost) => {
    return axios.delete(`api/v1/unfollow-post-by-user?idUser=${idUser}&idPost=${idPost}`);
}

const getFollowedPostsByUser = (idUser, page, limit) => {
    return axios.get(`api/v1/followed-post-by-user/${idUser}?page=${page}&limit=${limit}`);
}


export {
    followPostByUser, checkFollowPostByUser, unFollowPostByUser,
    getFollowedPostsByUser
};