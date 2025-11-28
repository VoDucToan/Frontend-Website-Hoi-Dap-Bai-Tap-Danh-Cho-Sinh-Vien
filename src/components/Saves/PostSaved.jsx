import { OverlayTrigger, Popover } from "react-bootstrap";
import AnswerSaved from "./AnswerSaved";
import QuestionSaved from "./QuestionSaved";
import { FaEllipsisVertical } from "react-icons/fa6";
import './PostSaved.scss';
import { deletePrivateNoteForItem, unsaveItemForUser, updatePrivateNoteForItem } from "../../services/apiItemSaveService";
import _ from "lodash";
import { toast } from "react-toastify";
import ModalMoveItem from "./ModalMoveItem";
import { useEffect, useState } from "react";

const PostSaved = (props) => {
    const { post, user, fetchItems, listSaves } = props;
    const [show, setShow] = useState(false);
    const [isShowUpdatePrivateNote, setIsShowUpdatePrivateNote] = useState(false);
    const [privateNote, setPrivateNote] = useState("");

    const fetchInitialPrivateNote = () => {
        if (!_.isEmpty(post) && post.private_note) {
            setPrivateNote(post.private_note);
        }
    }

    useEffect(() => {
        fetchInitialPrivateNote();
    }, [post])

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const getPrivateNote = (e) => {
        setPrivateNote(e.target.value);
    }

    const handleUnsavePost = async () => {
        if (!_.isEmpty(user) && !_.isEmpty(post)) {
            const res = await unsaveItemForUser(user.id, post.id);
            if (res && res.EC === 0) {
                const postType = post.idPostType === 1 ? "Câu hỏi" : "Câu trả lời"
                toast.success(`${postType} đã bỏ lưu thành công`);
                fetchItems();
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const handleDeletePrivateNote = async () => {
        const res = await deletePrivateNoteForItem(post.idItemSave);
        if (res && res.EC === 0) {
            toast.success(`Ghi chú đã xóa thành công`);
            fetchItems();
        }
        else {
            toast.error(res.EM);
        }
    }

    const handleShowUpdatePrivateNote = () => {
        setIsShowUpdatePrivateNote(true);
    }

    const handleQuitUpdatePrivateNote = () => {
        setIsShowUpdatePrivateNote(false);
        fetchItems();
    }


    const handleUpdatePrivateNote = async () => {
        const res = await updatePrivateNoteForItem(post.idItemSave, privateNote)
        if (res && res.EC === 0) {
            toast.success(`Ghi chú đã thêm thành công`);
            handleQuitUpdatePrivateNote();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className='post-saved' >
            {post.post_type_id === 1 ?
                (
                    <QuestionSaved
                        idQuestion={post.id}
                        titleQuestion={post.post_title}
                        questionAskedTime={post.askedTime}
                        idUser={post.created_by_user_id}
                        idAcceptedAnswer={post.accepted_answer_id}
                    />
                )
                :
                (
                    <AnswerSaved
                        idQuestion={post.parent_question_id}
                        idAnswer={post.id}
                        plainAnswer={post.post_plain_details}
                        idUser={post.created_by_user_id}
                        questionAskedTime={post.askedTime}
                    />
                )
            }
            <OverlayTrigger
                trigger="click"
                placement='bottom'
                rootClose
                overlay={
                    <Popover>
                        <Popover.Body>
                            <div onClick={() => handleUnsavePost()}>Bỏ lưu</div>
                            <div onClick={() => handleShow()}>Chuyển đến...</div>
                            {post.private_note ?
                                (
                                    <>
                                        <div onClick={() => handleShowUpdatePrivateNote()}>Chỉnh sửa ghi chú</div>
                                        <div onClick={() => handleDeletePrivateNote()}>Xóa ghi chú</div>
                                    </>
                                )
                                :
                                (
                                    <div onClick={() => handleShowUpdatePrivateNote()}>Thêm ghi chú</div>
                                )
                            }
                        </Popover.Body>
                    </Popover>
                }
            >
                <span className="icon-menu-post-saved">
                    <FaEllipsisVertical />
                </span>
            </OverlayTrigger >

            {
                post.private_note && !isShowUpdatePrivateNote && (
                    <div className="private-note-container">
                        <div className="before-private-note"></div>
                        <div className="content-private-note">
                            {post.private_note}
                        </div>
                    </div>
                )
            }

            {
                isShowUpdatePrivateNote && (
                    <div className="add-private-note">
                        <input type="text" className="form-control" placeholder="Viết ghi chú..."
                            value={privateNote} onChange={(e) => getPrivateNote(e)} />
                        <button type="button" className="btn btn-primary"
                            onClick={() => handleUpdatePrivateNote()}>Lưu</button>
                        <button type="button" className="btn btn-secondary"
                            onClick={() => handleQuitUpdatePrivateNote()}>Thoát</button>
                    </div>
                )
            }

            < ModalMoveItem show={show} handleClose={handleClose} listSaves={listSaves}
                idPostType={post.post_type_id} fetchItems={fetchItems}
                idItemSave={post.idItemSave} />
        </div >
    )
}

export default PostSaved;