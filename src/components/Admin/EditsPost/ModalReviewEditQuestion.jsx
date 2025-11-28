import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import VotePost from '../../Votes/VotePost';
import ListComments from '../../Comments/ListComments';
import './ModalReviewEditQuestion.scss';
import { getQuestions } from '../../../services/apiQuestionService';
import { getUser } from '../../../services/apiUserService';
import _ from 'lodash';
import htmldiff from '../../../utils/HTMLDiff/htmldiff';
import '../../../utils/HTMLDiff/htmldiff.scss';
import { getListTagsByEdit, } from '../../../services/apiTagService';
import { approveEditForPost, getEditPost, getImagesEdit, rejectEditForPost } from '../../../services/apiEditPostService';
import ProposedAuthor from '../../Users/ProposedAuthor';
import ListAnswers from '../../Answer/ListAnswers';
import Follow from '../../Post/Follow';
import { toast } from 'react-toastify';
import SummaryMetaQuestion from '../../Questions/SummaryMetaQuestion';
import SummaryStatsQuestion from '../../Questions/SummaryStatsQuestion';
import { getNumberVotesPost } from '../../../services/apiVoteService';

function ModalReviewEditQuestion(props) {
    const { idQuestion, editPostDetail, idEdit, nameUser, postProposedTime,
        editStatus, editSummary, previousEditId, editPostTile, avatarProposedAuthor,
        editedByUser
    } = props;

    const [show, setShow] = useState(false);
    const [question, setQuestion] = useState({});
    const [user, setUser] = useState({});
    const [numberVotes, setNumberVotes] = useState(0);
    const [editedQuestion, setEditedQuestion] = useState({})
    const [listTagsByEditedQuestion, setListTagsByEditedQuestion] = useState([]);
    const [listTagsByEdit, setListTagsByEdit] = useState([]);
    const [imagesEditedQuestion, setImagesEditedQuestion] = useState([]);
    const [imagesEdit, setImagesEdit] = useState([]);

    const fetchEditedQuestion = async () => {
        if (previousEditId) {
            const res = await getEditPost(previousEditId)
            if (res && res.EC === 0) {
                setEditedQuestion(res.DT);
            }
        }
    }

    const fetchImagesEditedQuestion = async () => {
        if (previousEditId) {
            const data = await getImagesEdit(previousEditId);
            setImagesEditedQuestion(data.DT);
        }
    }

    const fetchListTagsByEditedQuestion = async () => {
        if (previousEditId) {
            const res = await getListTagsByEdit(previousEditId);
            if (res && res.EC === 0) {
                setListTagsByEditedQuestion(res.DT.Tags);
            }
        }
    }

    useEffect(() => {
        fetchEditedQuestion();
        fetchImagesEditedQuestion();
        fetchListTagsByEditedQuestion();
    }, [previousEditId])

    const fetchListTagsByEdit = async () => {
        if (idEdit) {
            const res = await getListTagsByEdit(idEdit);
            if (res && res.EC === 0) {
                setListTagsByEdit(res.DT.Tags);
            }
        }
    }

    const fetchImagesEdit = async () => {
        if (idEdit) {
            const data = await getImagesEdit(idEdit);
            setImagesEdit(data.DT);
        }
    }

    useEffect(() => {
        fetchListTagsByEdit();
        fetchImagesEdit();
    }, [idEdit])

    const fetchNumberVotes = async () => {
        if (idQuestion) {
            let data = await getNumberVotesPost(idQuestion);
            setNumberVotes(data.DT);
        }
    }

    const fetchQuestion = async () => {
        if (idQuestion) {
            const res = await getQuestions(idQuestion);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchQuestion();
        fetchNumberVotes();
    }, [idQuestion])

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
    }, [question])

    useEffect(() => {
        if (!_.isEmpty(editedQuestion) && show) {
            let outputDetail = htmldiff(editedQuestion.post_details, editPostDetail)
            document.getElementById("id-content-edit-revision-detail-question").innerHTML = outputDetail;

            let outputTitle = htmldiff(editedQuestion.post_title, editPostTile)
            document.getElementById("id-content-edit-revision-detail-title").innerHTML = outputTitle;
        }

    }, [editedQuestion, editPostDetail, editPostTile, show])

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const buildTagsHtml = (tags = []) => {
        return `<div class="meta-tags"><ul class="meta-list-tags">` +
            tags.map(t => `<li class="meta-tag">${escapeHtml(t.tag_name)}</li>`).join('') +
            `</ul></div>`;
    }

    const fetchDiffListTags = () => {
        // const divListTagsEditedQuestion = document.createElement('div');
        // const rootListTagsEditedQuestion = createRoot(divListTagsEditedQuestion);
        // flushSync(() => {
        //     rootListTagsEditedQuestion.render(<ListTags listTags={listTagsByEditedQuestion} />);
        // });

        // const divListTagsEdit = document.createElement('div');
        // const rootListTagsEdit = createRoot(divListTagsEdit);
        // flushSync(() => {
        //     rootListTagsEdit.render(<ListTags listTags={listTagsByEdit} />);
        // });

        // let output = htmldiff(divListTagsEditedQuestion.innerHTML, divListTagsEdit.innerHTML);
        // document.getElementById("id-content-edit-revision-detail-tags").innerHTML = output;


        // const htmlListTagsEditedQuestion = renderToString(<ListTags listTags={listTagsByEditedQuestion} />);
        // const htmlListTagsEdit = renderToString(<ListTags listTags={listTagsByEdit} />);

        // const htmlListTagsEditedQuestion = renderToString(
        //     <MemoryRouter>
        //         <ListTags listTags={listTagsByEditedQuestion} />
        //     </MemoryRouter>
        // );
        // const htmlListTagsEdit = renderToString(
        //     <MemoryRouter>
        //         <ListTags listTags={listTagsByEdit} />
        //     </MemoryRouter>
        // );

        const htmlListTagsEditedQuestion = buildTagsHtml(listTagsByEditedQuestion);
        const htmlListTagsEdit = buildTagsHtml(listTagsByEdit);

        let output = htmldiff(htmlListTagsEditedQuestion, htmlListTagsEdit);
        document.getElementById("id-content-edit-revision-detail-tags").innerHTML = output;
    }

    useEffect(() => {
        if (show && listTagsByEditedQuestion.length !== 0 && listTagsByEdit.length !== 0) {
            fetchDiffListTags();
        }
    }, [show, listTagsByEditedQuestion, listTagsByEdit])

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
                "Bản chỉnh sửa của bạn bị từ chối", `/posts/${idQuestion}/edit`);
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
                "Bản chỉnh sửa của bạn được chấp nhận", `/questions/${idQuestion}`);
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
                            <h4>Review edit cho câu hỏi</h4>
                            <SummaryStatsQuestion
                                amountVotes={numberVotes}
                                amountAnswers={question.numberAnswers}
                                idAcceptedAnswer={question.accepted_answer_id}
                            />
                            <SummaryMetaQuestion
                                idQuestion={idQuestion}
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
                                            <VotePost idpost={idQuestion} idPostType={1} />
                                        </div>
                                        <div className="content-edit-revision-detail">
                                            <span className='content-edit-revision-detail-edit-summary'>
                                                Edit summary: {editSummary}
                                            </span>
                                            <h4 className='content-edit-revision-detail-title'
                                                id="id-content-edit-revision-detail-title">
                                            </h4>
                                            <div className="content-edit-revision-detail-question"
                                                id="id-content-edit-revision-detail-question">
                                            </div>

                                            <div className='content-edit-revision-detail-images'>
                                                <div className='content-edit-revision-detail-images-question'>
                                                    <h5>Hình ảnh câu hỏi</h5>
                                                    {imagesEditedQuestion && imagesEditedQuestion.length > 0 && imagesEditedQuestion.map((image, index) => {
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

                                            <div className="content-edit-revision-detail-tags"
                                                id="id-content-edit-revision-detail-tags">
                                            </div>

                                            <ProposedAuthor avatarAuthor={`http://localhost:8080/images/uploads/${avatarProposedAuthor}`} nameUser={nameUser}
                                                postProposedTime={postProposedTime} />
                                            <div className='mb-3'>
                                                <Follow idPost={idQuestion} postType={question.post_type_id} idAuthor={question.created_by_user_id} />
                                            </div>
                                            <ListComments idPost={idQuestion} />
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="answers" title="Trả lời">
                                    <ListAnswers idQuestion={idQuestion} idAcceptedAnswer={question.accepted_answer_id}
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

export default ModalReviewEditQuestion;