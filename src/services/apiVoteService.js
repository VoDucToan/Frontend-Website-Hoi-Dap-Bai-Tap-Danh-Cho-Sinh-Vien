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

const handleIncreaseVoteComment = (idComment, idUser, idVoteType) => {
    const data = {
        idComment: idComment,
        idUser: idUser,
        idVoteType: idVoteType
    }
    return axios.post(`api/v1/increase-vote-for-comment`, data);
}

const handleUnvoteComment = (idComment, idUser) => {
    return axios.delete(`api/v1/unvote-for-comment/${idComment}/${idUser}`);
}

const getVoteTypeComment = (idComment, idUser) => {
    return axios.get(`api/v1/vote-type-for-comment/${idComment}/${idUser}`);
}

export {
    getNumberVotesPost, handleIncreaseVotePost, handleUnvotePost,
    getVoteTypePost, handleDecreaseVotePost, getNumberVotesComment,
    handleIncreaseVoteComment, handleUnvoteComment, getVoteTypeComment
};