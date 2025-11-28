import './ListComments.scss';
import { useEffect, useState } from "react";
import { createComment, getListComments } from "../../services/apiCommentService";
import { getUser } from "../../services/apiUserService";
import VoteComment from '../Votes/VoteComment';
import Editor from '../../utils/Editor/Editor';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Comment from './Comment';

const ListComments = (props) => {
    const { idPost } = props;
    const [listComments, setListComments] = useState([]);
    const [list5Comments, setList5Comments] = useState([]);
    const [nameUser, setNameUser] = useState([]);
    const [contentComment, setContentComment] = useState("");
    const [plainTextComment, setPlainTextComment] = useState("");
    const [isShowAddComment, setIsShowAddComment] = useState(false);
    const [isShowMoreComment, setIsShowMoreComment] = useState(false);
    const [resetPage, setResetPage] = useState(1);

    const idUser = useSelector(state => state.auth.user.id);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchListComments = async () => {
            if (idPost) {
                const data = await getListComments(idPost);
                if (data && data.EC === 0) {
                    setListComments(data.DT);
                    const slicedArray = data.DT.slice(0, 5);
                    setList5Comments(slicedArray);
                }
            }
        }
        fetchListComments();
    }, [resetPage])

    useEffect(() => {
        const fetchNameUser = async () => {
            if (listComments && listComments.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNameUser = await Promise.all(
                    listComments.map(async (comment) => {
                        let data = await getUser(comment.created_by_user_id);
                        return data.DT[0].display_name;
                    })
                );
                setNameUser(arrNameUser);
            }
        }
        fetchNameUser();
    }, [listComments])

    const getContentEditor = (content, id) => {
        setContentComment(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextComment(plainText);
    }

    const handleIsShowAddComment = () => {
        setIsShowMoreComment(true);
        setIsShowAddComment(!isShowAddComment);
    }

    const validateAddComment = () => {
        if (!isAuthenticated) {
            toast.error(`Bạn cần đăng nhập để bình luận`)
            return false;
        }
        if (plainTextComment.length < 15) {
            toast.error("Bình luận phải chứa ít nhất 15 ký tự")
            return false;
        }
        return true;
    }

    const handleResetPage = () => {
        setContentComment("");
        setPlainTextComment("");
        setIsShowAddComment(false);
        setResetPage(Math.random());
    }

    const addComment = async () => {
        const isValidate = validateAddComment();
        if (!isValidate) {
            return;
        }

        const data = await createComment(idUser, idPost, contentComment);
        if (data && data.EC === 0) {
            handleResetPage();
        }
        else if (data?.EC === -1) {
            toast.error('Bạn phải đặt được 4 điểm danh tiếng để mở khóa chức năng bình luận');

        }
        else {
            toast.error('Thêm bình luận thất bại');
        }
    }

    const handleIsShowMoreComment = () => {
        setIsShowMoreComment(true);
    }

    return (
        <div className="list-comments-container">

            {!isShowMoreComment && list5Comments && list5Comments.length > 0 && list5Comments.map((comment, index) => {
                return (
                    <Comment comment={comment} author={nameUser[index]} key={comment.id} handleResetPage={handleResetPage} idUser={idUser} />
                )
            })}

            {isShowMoreComment && listComments && listComments.length > 0 && listComments.map((comment, index) => {
                return (
                    <Comment comment={comment} author={nameUser[index]} key={comment.id} handleResetPage={handleResetPage} idUser={idUser} />
                )
            })}

            {!isShowAddComment ?
                (
                    <span className="add-comment" onClick={() => handleIsShowAddComment()}>Thêm bình luận</span>
                ) :
                (
                    <div className='add-comment-container'>
                        <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                            initialHtml={""} resetPage={resetPage} initialHeight={"50px"} />
                        <div className='btn-add-comment'>
                            <button className='btn btn-primary d-block mb-3' onClick={() => addComment()}>Thêm bình luận</button>
                            <button className='btn btn-light' onClick={() => handleIsShowAddComment()}>Thoát</button>
                        </div>
                    </div>
                )}
            {listComments && listComments.length > 5 && !isShowMoreComment && (
                <>
                    <span> | </span>
                    <span className="more-comment" onClick={() => handleIsShowMoreComment()}>
                        Xem thêm <b>{listComments.length - 5}</b> bình luận
                    </span>
                </>
            )}

        </div>
    )
}

export default ListComments