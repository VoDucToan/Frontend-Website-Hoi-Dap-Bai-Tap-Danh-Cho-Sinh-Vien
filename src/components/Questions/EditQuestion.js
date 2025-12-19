import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../utils/Editor/Editor";
import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage";
import ListComments from "../Comments/ListComments";
import { useEffect, useState } from "react";
import { getImagesPost, getQuestions } from "../../services/apiQuestionService";
import { getListTags, getListTagsByEdit, getListTagsByQuestion } from "../../services/apiTagService";
import { toast } from "react-toastify";
import { editPost, getEditPost, getImagesEdit, getListRevisionsPost, updateEditPost } from "../../services/apiEditPostService";
import { useSelector } from "react-redux";

const EditQuestion = (props) => {
    const { idQuestion } = props;

    const [titleQuestion, setTitleQuestion] = useState("");
    const [detailQuestion, setDetailQuestion] = useState("");
    const [initialDetailQuestion, setInitialDetailQuestion] = useState("");
    const [plainTextDeTailQuestion, setPlainTextDeTailQuestion] = useState("");
    const [imageQuestions, setImageQuestions] = useState([]);
    const [initialImageQuestions, setInitialImageQuestions] = useState([]);
    const [listTags, setListTags] = useState([]);
    const [listRevisionsPost, setListRevisionsPost] = useState([]);
    const [idEdit, setIdEdit] = useState(0);
    const [editSummary, setEditSummary] = useState("");
    const [resetPage, setResetPage] = useState(1);

    const navigate = useNavigate();
    const idUser = useSelector(state => state.auth.user.id);

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    const fetchListTags = async () => {
        const data = await getListTags();
        if (data && data.EC === 0) {
            setListTags(data.DT);
        }
    }

    useEffect(() => {
        fetchListTags()
    }, [])

    const fetchListRevisionsForPost = async () => {
        const data = await getListRevisionsPost(idQuestion, idUser);
        if (data && data.EC === 0) {
            setListRevisionsPost(data.DT);
        }
    }

    useEffect(() => {
        fetchListRevisionsForPost()
    }, [idQuestion])

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
                setTitleQuestion(data.DT.post_title);
                setInitialDetailQuestion(data.DT.post_details);
                setEditSummary(data.DT.edit_summary);
            }
        }
        const fetchImagesEdit = async () => {
            const dataImagesEdit = await getImagesEdit(idEdit);
            if (dataImagesEdit && dataImagesEdit.EC === 0) {
                const arrDataImagesEdit = dataImagesEdit.DT.map((imageEdit) => {
                    return imageEdit.file_name;
                })
                setInitialImageQuestions(arrDataImagesEdit);
            }
        }
        const fetchListTagsByEdit = async () => {
            const dataListTagsByEdit = await getListTagsByEdit(idEdit);
            const valueSelected = dataListTagsByEdit?.DT?.tags?.map((tag) => {
                return tag.id;
            })
            if (valueSelected) {
                const $ = window.$;
                const $sel = $('#multiple-select-field');
                $sel.val(valueSelected);
                $sel.trigger('change'); // Notify any JS components that the value changed
            }
        }

        const fetchAll = async () => {
            await Promise.all([
                fetchEditPost(),
                fetchImagesEdit(),
                fetchListTagsByEdit(),
            ]);
            // handleResetPage();
        };
        if (idEdit) {
            fetchAll();
        }
    }, [idEdit])

    const getTitleQuestion = (e) => {
        setTitleQuestion(e.target.value);
    }

    const getContentEditor = (content, id) => {
        setDetailQuestion(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextDeTailQuestion(plainText);
    }

    const getImage = (image) => {
        setImageQuestions(image);
    }

    const getEditSummary = (e) => {
        setEditSummary(e.target.value);
    }

    const getRevision = (e) => {
        setIdEdit(e.target.value);
    }

    const validateEditQuestion = (listTagsChoice) => {
        if (titleQuestion.length < 15) {
            toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
            return false;
        }
        if (plainTextDeTailQuestion.length < 40) {
            toast.error("Mô tả chi tiết câu hỏi phải chứa ít nhất 40 ký tự")
            return false;
        }
        if (listTagsChoice.length < 1) {
            toast.error("Câu hỏi phải chứa ít nhất một thẻ mô tả chủ đề");
            return false;
        }
        if (editSummary.length < 10) {
            toast.error("Edit summary phải chứa ít nhất 10 ký tự");
            return false;
        }
        return true;
    }

    const handleQuit = () => {
        navigate(`/questions/${idQuestion}`);
    }

    const handleSaveChanges = async () => {
        const $ = window.$;
        const $sel = $('#multiple-select-field');
        let el = $sel.select2('data');
        const isValidate = validateEditQuestion(el);
        if (!isValidate) {
            return;
        }

        const listIdTags = el.map((tag) => {
            return tag.id;
        })

        if (listRevisionsPost[0].edit_status === 0) {
            const dataUpdateEditPost = await updateEditPost(listRevisionsPost[0].id, titleQuestion,
                detailQuestion, plainTextDeTailQuestion, editSummary, imageQuestions, listIdTags);
            if (dataUpdateEditPost && dataUpdateEditPost.EC === 0) {
                toast.success("Gửi chỉnh sửa câu hỏi thành công");
                handleQuit();
            }
            else {
                toast.error(dataUpdateEditPost.EM);
            }
        }
        else if (listRevisionsPost[0].edit_status === 1) {
            const dataEditPost = await editPost(idUser, idQuestion, titleQuestion, detailQuestion,
                plainTextDeTailQuestion, editSummary, imageQuestions, listIdTags, listRevisionsPost[0].id);
            if (dataEditPost && dataEditPost.EC === 0) {
                toast.success("Gửi chỉnh sửa câu hỏi thành công");
                handleQuit();
            }
            else {
                toast.error(dataEditPost.EM);
            }
        }
    }

    useEffect(() => {
        const $ = window.$;
        const $sel = $('#multiple-select-field');
        $sel.select2({
            theme: "bootstrap-5",
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            placeholder: $(this).data('placeholder'),
            closeOnSelect: false,
        });
    }, [])



    return (
        <div className="edit-question-container">
            <div className="revision-edit-question mb-4">
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

            <div className="edit-title-question mb-4">
                <label className="fw-bold form-label" htmlFor="title-input-id">Tiêu Đề</label>
                <input type="text" className="form-control" placeholder="Ví dụ: Làm sao viết chương trình Hello World với C++?"
                    value={titleQuestion} onChange={(e) => getTitleQuestion(e)} />
            </div>

            <div className="edit-detail-question mb-4">
                <label className="fw-bold form-label ">Mô tả chi tiết câu hỏi.</label>
                <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                    initialHtml={initialDetailQuestion} resetPage={resetPage} initialHeight={"210px"} />
            </div>
            <UploadAndDisplayImage getImage={getImage} initialImage={initialImageQuestions}
                isMultiple={true} resetPage={resetPage} />
            <div className="edit-tag-question mt-4">
                <label className="fw-bold form-label" htmlFor="multiple-select-field">Thẻ</label>
                <select className="form-select" id="multiple-select-field" data-placeholder="Chọn thẻ cho câu hỏi" multiple>
                    {listTags && listTags.length > 0 && listTags.map((tag, index) => {
                        return (
                            <option key={tag.id} value={tag.id}>{tag.tag_name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="edit-summary-question mt-4">
                <label htmlFor="input-summary-question" className="form-label fw-bold">Edit Summary</label>
                <input type="text" className="form-control" id="input-summary-question" placeholder="Giải thích rõ ràng thay đổi của bạn (sửa chỉnh tả, sửa cú pháp, cải thiện format)"
                    value={editSummary} onChange={(e) => getEditSummary(e)} />
            </div>

            <button type="button" className="btn btn-primary mt-3" onClick={() => handleSaveChanges()}>Lưu chỉnh sửa</button>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => handleQuit()}>Thoát</button>

            <ListComments idPost={idQuestion} />
        </div>
    )
}

export default EditQuestion;
