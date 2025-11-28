import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VotePost from '../../Votes/VotePost';
import ListComments from '../../Comments/ListComments';
import './ModalReviewEditAnswer.scss';
import { getQuestionByAnswer } from '../../../services/apiQuestionService';
import { getUser } from '../../../services/apiUserService';
import _ from 'lodash';
import htmldiff from '../../../utils/HTMLDiff/htmldiff';
import '../../../utils/HTMLDiff/htmldiff.scss';
import { approveEditForPost, getEditForPost, getEditPost, getImagesEdit, rejectEditForPost } from '../../../services/apiEditPostService';
import ProposedAuthor from '../../Users/ProposedAuthor';
import ListAnswers from '../../Answer/ListAnswers';
import Follow from '../../Post/Follow';
import { toast } from 'react-toastify';
import DetailQuestion from '../../Questions/DetailQuestion';
import SummaryMetaQuestion from '../../Questions/SummaryMetaQuestion';
import SummaryStatsQuestion from '../../Questions/SummaryStatsQuestion';
import { getNumberVotesPost } from '../../../services/apiVoteService';

function ModalReviewEditAnswer(props) {
    const { idAnswer, editPostDetail, idEdit, nameUser, postProposedTime,
        editStatus, editSummary, previousEditId, editPostTile, avatarProposedAuthor,
        editedByUser
    } = props;

    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState({});
    const [user, setUser] = useState({});
    const [numberVotes, setNumberVotes] = useState(0);
    const [editedAnswer, setEditedAnswer] = useState({})
    const [imagesEditedAnswer, setImagesEditedAnswer] = useState([]);
    const [imagesEdit, setImagesEdit] = useState([]);
    const [editQuestion, setEditQuestion] = useState({});

    const fetchEditedAnswer = async () => {
        if (previousEditId) {
            const res = await getEditPost(previousEditId)
            if (res && res.EC === 0) {
                setEditedAnswer(res.DT);
            }
        }
    }


    const fetchImagesEditedAnswer = async () => {
        if (previousEditId) {
            const data = await getImagesEdit(previousEditId);
            setImagesEditedAnswer(data.DT);
        }
    }

    useEffect(() => {
        fetchEditedAnswer();
        fetchImagesEditedAnswer();
    }, [previousEditId])

    const fetchImagesEdit = async () => {
        if (idEdit) {
            const data = await getImagesEdit(idEdit);
            setImagesEdit(data.DT);
        }
    }

    useEffect(() => {
        fetchImagesEdit();
    }, [idEdit])

    const fetchQuestion = async () => {
        if (idAnswer) {
            const res = await getQuestionByAnswer(idAnswer);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [idAnswer])

    const fetchNumberVotes = async () => {
        if (question?.id) {
            let data = await getNumberVotesPost(question.id);
            setNumberVotes(data.DT);
        }
    }

    const fetchEditQuestion = async () => {
        if (question?.id) {
            const res = await getEditForPost(question.id);
            if (res && res.EC === 0) {
                setEditQuestion(res.DT);
            }
        }
    }

    const fetchUser = async () => {
        if (question?.created_by_user_id) {
            const res = await getUser(question.created_by_user_id);
            if (res && res.EC === 0) {
                setUser(res.DT[0]);
            }
        }
    }

    useEffect(() => {
        fetchUser();
        fetchNumberVotes();
        fetchEditQuestion();
    }, [question])

    useEffect(() => {
        if (!_.isEmpty(editedAnswer) && show) {
            let outputDetail = htmldiff(editedAnswer.post_details, editPostDetail)
            document.getElementById("id-content-edit-revision-detail-answer").innerHTML = outputDetail;
        }

    }, [editedAnswer, editPostDetail, editPostTile, show])

    const getIdAcceptedAnswer = (idAnswer) => {
        setQuestion({
            ...question,
            accepted_answer_id: idAnswer,
        });
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleReject = async () => {
        const reply = window.confirm("Bạn muốn từ chối chỉnh sửa này?");
        if (reply) {
            const res = await rejectEditForPost(idEdit, editedByUser, "Chỉnh sửa",
                "Bản chỉnh sửa của bạn bị từ chối", `/posts/${idAnswer}/edit`);
            if (res && res.EC === 0) {
                toast.success('Từ chối chỉnh sửa thành công');
                setShow(false);
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const handleApprove = async () => {
        const reply = window.confirm("Bạn muốn chấp nhận chỉnh sửa này?");
        if (reply) {
            const res = await approveEditForPost(idEdit, editedByUser, "Chỉnh sửa",
                "Bản chỉnh sửa của bạn được chấp nhận", `/questions/${question.id}`);
            if (res && res.EC === 0) {
                toast.success('Chấp nhận chỉnh sửa thành công');
                setShow(false);
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    return (
        <>
            <button className="btn btn-info" onClick={handleShow}>Review</button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Review Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='review-suggested-edit-container'>
                        <div className='following-edit'>
                            <h4>Review edit cho câu trả lời</h4>
                            <SummaryStatsQuestion
                                amountVotes={numberVotes}
                                amountAnswers={question.numberAnswers}
                                idAcceptedAnswer={question.accepted_answer_id}
                            />
                            <SummaryMetaQuestion
                                idQuestion={question.id}
                                idAuthor={question.created_by_user_id}
                                titleQuestion={question.post_title}
                                avatarAuthor={`http://localhost:8080/images/uploads/${user.avatar_file_name}`}
                                nameUser={user.display_name}
                                questionAskedTime={question.askedTime}
                                reputation={user.reputation}
                            />
                        </div>
                        <hr />
                        <div className='content-edit'>
                            <Tabs
                                defaultActiveKey="revision"
                                className="mb-3"
                            >
                                <Tab eventKey="revision" title="Sửa đổi">
                                    <div className='content-edit-revision'>
                                        <div >
                                            <VotePost idpost={idAnswer} idPostType={2} />
                                        </div>
                                        <div className="content-edit-revision-detail">
                                            <span className='content-edit-revision-detail-edit-summary'>
                                                Edit summary: {editSummary}
                                            </span>

                                            <div className="content-edit-revision-detail-answer"
                                                id="id-content-edit-revision-detail-answer">
                                            </div>

                                            <div className='content-edit-revision-detail-images'>
                                                <div className='content-edit-revision-detail-images-answer'>
                                                    <h5>Hình ảnh câu trả lời</h5>
                                                    {imagesEditedAnswer && imagesEditedAnswer.length > 0 && imagesEditedAnswer.map((image, index) => {
                                                        return (
                                                            <img src={`http://localhost:8080/images/uploads/${image.file_name}`}
                                                                className='img-thumbnail' key={index} />
                                                        )
                                                    })}
                                                </div>
                                                <div className='content-edit-revision-detail-images-edit'>
                                                    <h5>Hình ảnh chỉnh sửa</h5>
                                                    {imagesEdit && imagesEdit.length > 0 && imagesEdit.map((image, index) => {
                                                        return (
                                                            <img src={`http://localhost:8080/images/uploads/${image.file_name}`}
                                                                className='img-thumbnail' key={index} />
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <ProposedAuthor
                                                avatarAuthor={`http://localhost:8080/images/uploads/${avatarProposedAuthor}`}
                                                nameUser={nameUser}
                                                postProposedTime={postProposedTime} />
                                            <div className='mb-3'>
                                                {/* <Follow idPost={idAnswer} postType={question.post_type_id} idAuthor={question.created_by_user_id}/> */}
                                            </div>
                                            <ListComments idPost={idAnswer} />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="question" title="Câu hỏi">
                                    <DetailQuestion detailQuestion={question.post_details}
                                        idPost={question.id}
                                        idAuthorEdited={editQuestion.edited_by_user_id}
                                        idAuthorAsked={question.created_by_user_id}
                                        askedTime={question.askedTime}
                                        editedTime={editQuestion.editedTime}
                                        previousEditId={editQuestion.previous_edit_id}
                                        postType={question.post_type_id} />
                                </Tab>
                                <Tab eventKey="answers" title="Trả lời">
                                    <ListAnswers idQuestion={question.id} idAcceptedAnswer={question.accepted_answer_id}
                                        getIdAcceptedAnswer={getIdAcceptedAnswer} idAuthor={question.created_by_user_id}
                                        numberAnswers={question.numberAnswers} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {editStatus === 0 &&
                        (
                            <>
                                <Button variant="success" onClick={() => handleApprove()}>
                                    Approve
                                </Button>
                                <Button variant="danger" onClick={() => handleReject()}>
                                    Reject
                                </Button>
                            </>
                        )}

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalReviewEditAnswer;