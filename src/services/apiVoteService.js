import axios from "../utils/Axios/axiosCustomize";

const getNumberVotesPost = (idPost) => {
    return axios.get(`api/v1/number-vote-for-post/${idPost}`);
}

const handleIncreaseVotePost = (idPost, idUser, idVoteType) => {
    const data = {
        idPost: idPost,
        idUser: idUser,
        idVoteType: idVoteType
    }
    return axios.post('api/v1/increase-vote-for-post', data);
}

const handleUnvotePost = (idPost, idUser) => {
    return axios.delete(`api/v1/unvote-for-post/${idPost}/${idUser}`);
}

const getVoteTypePost = (idPost, idUser) => {
    return axios.get(`api/v1/vote-type-for-post/${idPost}/${idUser}`);
}

const handleDecreaseVotePost = (idPost, idUser, idVoteType) => {
    const data = {
        idPost: idPost,
        idUser: idUser,
        idVoteType: idVoteType
    }
    return axios.post('api/v1/decrease-vote-for-post', data);
}

const getNumberVotesComment = (idComment) => {
    return axios.get(`api/v1/number-vote-for-comment/${idComment}`);
}

const handleIncreaseVoteComment = (idComment, idUser) => {
    const data = {
        idComment: idComment,
        idUser: idUser,
    }
    return axios.post(`api/v1/increase-vote-for-comment`, data);
}

const handleUnvoteComment = (idComment, idUser) => {
    return axios.delete(`api/v1/unvote-for-comment/${idComment}/${idUser}`);
}

const getVoteTypeComment = (idComment, idUser) => {
    return axios.get(`api/v1/vote-type-for-comment/${idComment}/${idUser}`);
}

const upVoteForPost = (idPost, idUser) => {
    const data = {
        idPost, idUser
    }
    return axios.post('api/v1/up-vote-for-post', data);
}

const downVoteForPost = (idPost, idUser) => {
    const data = {
        idPost, idUser
    }
    return axios.post('api/v1/down-vote-for-post', data);
}

const getVotePostsByUser = (page, limit, idUser) => {
    return axios.get(`api/v1/vote-posts-by-user/${idUser}?page=${page}&limit=${limit}`);
}

export {
    getNumberVotesPost, handleIncreaseVotePost, handleUnvotePost,
    getVoteTypePost, handleDecreaseVotePost, getNumberVotesComment,
    handleIncreaseVoteComment, handleUnvoteComment, getVoteTypeComment,
    upVoteForPost, downVoteForPost, getVotePostsByUser
};