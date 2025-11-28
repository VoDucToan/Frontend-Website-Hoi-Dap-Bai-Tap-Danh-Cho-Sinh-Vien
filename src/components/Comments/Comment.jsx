import { useEffect, useState } from "react";
import VoteComment from "../Votes/VoteComment";
import Editor from "../../utils/Editor/Editor";
import { deleteComment, editComment } from "../../services/apiCommentService";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Comment = (props) => {
    const { comment, author, handleResetPage, idUser } = props

    const [contentComment, setContentComment] = useState("");
    const [initialContentComment, setInitialContentComment] = useState("");
    const [plainTextComment, setPlainTextComment] = useState("");
    const [resetPage, setResetPage] = useState(1);
    const [isShowEditComment, setIsShowEditComment] = useState(false);

    useEffect(() => {
        setInitialContentComment(comment.comment_text);
        if (!isShowEditComment) {
            const idElement = comment.id + "-content-comment";
            document.getElementById(idElement).innerHTML = comment.comment_text;
        }
    }, [comment, isShowEditComment])

    const getContentEditor = (content, id) => {
        setContentComment(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextComment(plainText);
    }

    const validateEditComment = () => {
        if (plainTextComment.length < 15) {
            toast.error("Bình luận phải chứa ít nhất 15 ký tự")
            return false;
        }

        return true;
    }

    const handleEditComment = async () => {
        const isValidate = validateEditComment();
        if (!isValidate) {
            return;
        }

        const res = await editComment(contentComment, comment.id)
        if (res && res.EC === 0) {
            setIsShowEditComment(false);
            handleResetPage();
        }
        else {
            toast.error('Chỉnh sửa bình luận thất bại');
        }
    }

    const handleIsShowEditComment = () => {
        setIsShowEditComment(!isShowEditComment);
    }

    const handleDeleteComment = async () => {
        const reply = window.confirm("Bạn muốn xóa bình luận này?");
        if (reply) {
            const res = await deleteComment(comment.id)
            if (res && res.EC === 0) {
                toast.success("Xóa bình luận thành công!");
                handleResetPage();
            }
            else {
                toast.error('Xóa bình luận thất bại');
            }
        }

    }

    return (
        <>
            {
                !isShowEditComment ?
                    (
                        <div className="comment" >
                            <VoteComment idComment={comment.id} />
                            <div className="content-comment">
                                <span id={comment.id + '-content-comment'}></span>
                                <span className='signature-comment'>
                                    <span className='author-comment'>{author}</span> - <span className='datetime-comment'>{comment.commentedTime}</span>
                                </span>
                                {comment.createdAt < comment.updatedAt && (
                                    <OverlayTrigger
                                        placement={'bottom'}
                                        overlay={
                                            <Tooltip>
                                                bình luận này đã được chỉnh sửa
                                            </Tooltip>
                                        }
                                    >
                                        <span className="icon-edited-comment"><MdModeEdit /></span>
                                    </OverlayTrigger>
                                )}
                                {idUser === comment.created_by_user_id && (
                                    <span className='action-comment'>
                                        <span className='edit-comment' onClick={() => handleIsShowEditComment()}>Chỉnh sửa</span>
                                        <span className='delete-comment' onClick={() => handleDeleteComment()}>Xóa</span>
                                    </span>
                                )}

                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='edit-comment-container' >
                            <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                                initialHtml={initialContentComment} resetPage={resetPage} initialHeight={"50px"} />
                            <div className='btn-edit-comment'>
                                <button className='btn btn-primary d-block mb-3' onClick={() => handleEditComment()}>Chỉnh sửa bình luận</button>
                                <button className='btn btn-light' onClick={() => handleIsShowEditComment()}>Thoát</button>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Comment;