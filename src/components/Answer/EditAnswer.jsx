import { useEffect, useState } from "react";
import { editPost, getEditPost, getImagesEdit, getListRevisionsPost, updateEditPost } from "../../services/apiEditPostService";
import ListComments from "../Comments/ListComments";
import Editor from "../../utils/Editor/Editor";
import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getImagesPost, getQuestions } from "../../services/apiQuestionService";

const EditAnswer = (props) => {
    const { idAnswer, idQuestion } = props;
    const [listRevisionsPost, setListRevisionsPost] = useState([]);
    const [detailAnswer, setDetailAnswer] = useState("");
    const [initialDetailAnswer, setInitialDetailAnswer] = useState("");
    const [editSummary, setEditSummary] = useState("");
    const [plainTextDeTailAnswer, setPlainTextDeTailAnswer] = useState("");
    const [imageAnswers, setImageAnswers] = useState([]);
    const [initialImageAnswers, setInitialImageAnswers] = useState([]);
    const [resetPage, setResetPage] = useState(1);
    const [idEdit, setIdEdit] = useState(0);
    const [question, setQuestion] = useState({});
    const [imagesQuestion, setImagesQuestion] = useState([]);


    const navigate = useNavigate();
    const idUser = useSelector(state => state.auth.user.id);

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    const fetchListRevisionsForPost = async () => {
        const data = await getListRevisionsPost(idAnswer, idUser);
        if (data && data.EC === 0) {
            setListRevisionsPost(data.DT);
        }
    }

    useEffect(() => {
        fetchListRevisionsForPost()
    }, [idAnswer])

    const fetchQuestion = async () => {
        const res = await getQuestions(idQuestion);
        if (res && res.EC === 0) {
            setQuestion(res.DT);
        }
    }

    const fetchImagesQuestion = async () => {
        const data = await getImagesPost(idQuestion);
        setImagesQuestion(data.DT);
    }

    useEffect(() => {
        if (idQuestion) {
            fetchQuestion();
            fetchImagesQuestion();
        }
    }, [idQuestion])

    useEffect(() => {
        document.getElementById("id-content-question-edit").innerHTML = question.post_details;
    }, [question])

    const fetchInitialIdEdit = () => {
        if (listRevisionsPost && listRevisionsPost.length > 0) {
            setIdEdit(listRevisionsPost[0].id);
        }
    }

    useEffect(() => {
        fetchInitialIdEdit();
    }, [listRevisionsPost])

    useEffect(() => {
        const fetchEditPost = async () => {
            const data = await getEditPost(idEdit);
            if (data && data.EC === 0) {
                setInitialDetailAnswer(data.DT.post_details);
                setEditSummary(data.DT.edit_summary);
            }
        }
        const fetchImagesEdit = async () => {
            const dataImagesEdit = await getImagesEdit(idEdit);
            if (dataImagesEdit && dataImagesEdit.EC === 0) {
                const arrDataImagesEdit = dataImagesEdit.DT.map((imageEdit) => {
                    return imageEdit.file_name;
                })
                setInitialImageAnswers(arrDataImagesEdit);
            }
        }

        const fetchAll = async () => {
            await Promise.all([
                fetchEditPost(),
                fetchImagesEdit(),
            ]);
            handleResetPage();
        };
        if (idEdit) {
            fetchAll();
        }
    }, [idEdit])

    const getContentEditor = (content, id) => {
        setDetailAnswer(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextDeTailAnswer(plainText);
    }

    const getImage = (image) => {
        setImageAnswers(image);
    }

    const getEditSummary = (e) => {
        setEditSummary(e.target.value);
    }

    const getRevision = (e) => {
        setIdEdit(e.target.value);
    }

    const handleQuit = () => {
        navigate(`/questions/${idQuestion}`);
    }

    const validateEditAnswer = () => {
        if (plainTextDeTailAnswer.length < 40) {
            toast.error("Mô tả chi tiết câu hỏi phải chứa ít nhất 40 ký tự")
            return false;
        }
        if (editSummary.length < 10) {
            toast.error("Edit summary phải chứa ít nhất 10 ký tự");
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        const isValidate = validateEditAnswer();
        if (!isValidate) {
            return;
        }

        if (listRevisionsPost[0].edit_status === 0) {
            const dataUpdateEditPost = await updateEditPost(listRevisionsPost[0].id, '',
                detailAnswer, plainTextDeTailAnswer, editSummary, imageAnswers, []);
            if (dataUpdateEditPost && dataUpdateEditPost.EC === 0) {
                toast.success("Gửi chỉnh sửa câu trả lời thành công");
                handleQuit();
            }
            else {
                toast.error(dataUpdateEditPost.EM);
            }
        }
        else if (listRevisionsPost[0].edit_status === 1) {
            const dataEditPost = await editPost(idUser, idAnswer, '', detailAnswer,
                editSummary, imageAnswers, [], listRevisionsPost[0].id);
            if (dataEditPost && dataEditPost.EC === 0) {
                toast.success("Gửi chỉnh sửa câu trả lời thành công");
                handleQuit();
            }
            else {
                toast.error(dataEditPost.EM);
            }
        }
    }

    return (
        <div className="edit-answer-container">
            <div className="revision-edit-answer mb-4">
                <label htmlFor="revisions-list" className="form-label fw-bold">Rev</label>
                <select className="form-select" id="revisions-list" onChange={(e) => getRevision(e)}>
                    {listRevisionsPost && listRevisionsPost.length > 0 && listRevisionsPost.map((revision, index) => {
                        return (
                            <option value={revision.id} key={revision.id}>
                                {revision.display_name} - {revision.createdAt} {revision.edit_summary && '- ' + revision.edit_summary}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className="detail-question-edit mb-4" style={{ height: '100px', overflow: 'hidden', resize: 'vertical' }}>
                <div className="mb-3" id="id-content-question-edit"></div>
                {imagesQuestion && imagesQuestion.length > 0 && imagesQuestion.map((image, index) => {
                    return (
                        <img src={image.file_name} className='img-thumbnail' key={index} />
                    )
                })}
            </div>

            <div className="edit-detail-answer mb-4">
                <label className="fw-bold form-label ">Mô tả chi tiết trả lời.</label>
                <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                    initialHtml={initialDetailAnswer} resetPage={resetPage} initialHeight={"210px"} />
            </div>
            <UploadAndDisplayImage getImage={getImage} initialImage={initialImageAnswers}
                isMultiple={true} resetPage={resetPage} />

            <div className="edit-summary-question mt-4">
                <label htmlFor="input-summary-question" className="form-label fw-bold">Edit Summary</label>
                <input type="text" className="form-control" id="input-summary-question" placeholder="Giải thích rõ ràng thay đổi của bạn (sửa chỉnh tả, sửa cú pháp, cải thiện format)"
                    value={editSummary} onChange={(e) => getEditSummary(e)} />
            </div>

            <button type="button" className="btn btn-primary mt-3" onClick={() => handleSaveChanges()}>Lưu chỉnh sửa</button>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => handleQuit()}>Thoát</button>

            <ListComments idPost={idAnswer} />
        </div>
    )
}

export default EditAnswer;