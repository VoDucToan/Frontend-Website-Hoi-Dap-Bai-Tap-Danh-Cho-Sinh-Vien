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
                    return `${process.env.REACT_APP_URL_NODE}/images/uploads/${imageEdit.file_name}`;
                })
                setInitialImageQuestions(arrDataImagesEdit);
            }
        }
        const fetchListTagsByEdit = async () => {
            const dataListTagsByEdit = await getListTagsByEdit(idEdit);
            const valueSelected = dataListTagsByEdit?.DT?.Tags?.map((tag) => {
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
                detailQuestion, editSummary, imageQuestions, listIdTags);
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
                editSummary, imageQuestions, listIdTags, listRevisionsPost[0].id);
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




// "use client"

// import { useNavigate, useParams } from "react-router-dom"
// import Editor from "../../utils/Editor/Editor"
// import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage"
// import ListComments from "../Comments/ListComments"
// import { useEffect, useState } from "react"
// import { getImagesPost, getQuestions } from "../../services/apiQuestionService"
// import { getListTags, getListTagsByQuestion } from "../../services/apiTagService"
// import { toast } from "react-toastify"
// import { editPost, getEditPost, getListRevisionsPost } from "../../services/apiEditPostService"
// import { useSelector } from "react-redux"
// // import $ from "jquery"
// // import "select2"

// const EditQuestion = () => {
//     const [titleQuestion, setTitleQuestion] = useState("")
//     const [detailQuestion, setDetailQuestion] = useState("")
//     const [plainTextDeTailQuestion, setPlainTextDeTailQuestion] = useState("")
//     const [imageQuestions, setImageQuestions] = useState([])
//     const [listTags, setListTags] = useState([])
//     const [listRevisionsPost, setListRevisionsPost] = useState([])
//     const [idEdit, setIdEdit] = useState(0)
//     const [editSummary, setEditSummary] = useState("")
//     const [resetPage, setResetPage] = useState(1)
//     const [isLoading, setIsLoading] = useState(false)

//     const { idpost } = useParams()
//     const navigate = useNavigate()
//     const idUser = useSelector((state) => state.auth.user.id)

//     const handleResetPage = () => {
//         setResetPage(Math.random())
//     }

//     useEffect(() => {
//         const fetchQuestion = async () => {
//             const data = await getQuestions(idpost)
//             if (data && data.EC === 0) {
//                 setTitleQuestion(data.DT.post_title)
//                 setDetailQuestion(data.DT.post_details)
//             }
//         }
//         const fetchImagesQuestion = async () => {
//             const dataImagesPost = await getImagesPost(idpost)
//             if (dataImagesPost && dataImagesPost.EC === 0) {
//                 const arrDataImagesPost = dataImagesPost.DT.map((imagePost) => {
//                     return `${process.env.REACT_APP_URL_NODE}/images/uploads/${imagePost.file_name}`
//                 })
//                 setImageQuestions(arrDataImagesPost)
//             }
//         }
//         const fetchListTags = async () => {
//             const data = await getListTags()
//             setListTags(data)
//         }

//         const fetchListTagsByQuestion = async () => {
//             const dataListTagsByQuestion = await getListTagsByQuestion(idpost)
//             const valueSelected = dataListTagsByQuestion?.DT?.map((tag) => {
//                 return tag.tag_id
//             })
//             $("#multiple-select-field").val(valueSelected)
//             $("#multiple-select-field").trigger("change")
//         }

//         const fetchListRevisionsForPost = async () => {
//             const data = await getListRevisionsPost(idpost)
//             if (data && data.EC === 0) {
//                 setListRevisionsPost(data.DT)
//             }
//         }

//         const fetchAll = async () => {
//             setIsLoading(true)
//             await Promise.all([
//                 fetchQuestion(),
//                 fetchImagesQuestion(),
//                 fetchListTags(),
//                 fetchListTagsByQuestion(),
//                 fetchListRevisionsForPost(),
//             ])
//             handleResetPage()
//             setIsLoading(false)
//         }
//         fetchAll()
//     }, [idpost])

//     useEffect(() => {
//         const fetchEditPost = async () => {
//             const data = await getEditPost(idEdit)
//             if (data && data.EC === 0) {
//                 setTitleQuestion(data.DT.post_title)
//                 setDetailQuestion(data.DT.post_details)
//                 setEditSummary(data.DT.edit_summary)
//             }
//         }
//         const fetchImagesQuestion = async () => {
//             const dataImagesPost = await getImagesPost(idpost)
//             if (dataImagesPost && dataImagesPost.EC === 0) {
//                 const arrDataImagesPost = dataImagesPost.DT.map((imagePost) => {
//                     return `${process.env.REACT_APP_URL_NODE}/images/uploads/${imagePost.file_name}`
//                 })
//                 setImageQuestions(arrDataImagesPost)
//             }
//         }
//         if (idEdit > 0) {
//             fetchEditPost()
//             handleResetPage()
//         }
//     }, [idEdit])

//     useEffect(() => {
//         $("#multiple-select-field").select2({
//             theme: "bootstrap-5",
//             width: $(this).data("width") ? $(this).data("width") : $(this).hasClass("w-100") ? "100%" : "style",
//             placeholder: $(this).data("placeholder"),
//             closeOnSelect: false,
//         })
//     }, [listTags])

//     const getTitleQuestion = (e) => {
//         setTitleQuestion(e.target.value)
//     }

//     const getContentEditor = (content, id) => {
//         setDetailQuestion(content)
//     }

//     const getPlainTextEditor = (plainText, id) => {
//         setPlainTextDeTailQuestion(plainText)
//     }

//     const getImage = (image) => {
//         setImageQuestions(image)
//     }

//     const getEditSummary = (e) => {
//         setEditSummary(e.target.value)
//     }

//     const getRevision = (e) => {
//         setIdEdit(e.target.value)
//     }

//     const validateEditQuestion = (listTagsChoice) => {
//         if (titleQuestion.length < 15) {
//             toast.error("Tiêu đề phải chứa ít nhất 15 ký tự")
//             return false
//         }
//         if (plainTextDeTailQuestion.length < 40) {
//             toast.error("Mô tả chi tiết câu hỏi phải chứa ít nhất 40 ký tự")
//             return false
//         }
//         if (listTagsChoice.length < 1) {
//             toast.error("Câu hỏi phải chứa ít nhất một thẻ mô tả chủ đề")
//             return false
//         }
//         if (editSummary.length < 10) {
//             toast.error("Edit summary phải chứa ít nhất 10 ký tự")
//             return false
//         }
//         return true
//     }

//     const handleQuit = () => {
//         navigate(`/questions/${idpost}`)
//     }

//     const handleSaveChanges = async () => {
//         setIsLoading(true)
//         const el = $("#multiple-select-field").select2("data")
//         const isValidate = validateEditQuestion(el)
//         if (!isValidate) {
//             setIsLoading(false)
//             return
//         }

//         const listIdTags = el.map((tag) => {
//             return tag.id
//         })

//         const dataEditPost = await editPost(
//             idUser,
//             idpost,
//             titleQuestion,
//             detailQuestion,
//             editSummary,
//             imageQuestions,
//             listIdTags,
//         )
//         if (dataEditPost && dataEditPost.EC === 0) {
//             toast.success("Gửi chỉnh sửa câu hỏi thành công")
//             handleQuit()
//         } else {
//             toast.error(dataEditPost.EM)
//         }
//         setIsLoading(false)
//     }

//     if (isLoading) {
//         return (
//             <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
//                 <div className="text-center">
//                     <div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="text-muted mt-2 mb-0 small">Đang tải...</p>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div style={{ backgroundColor: "#fafbfc", minHeight: "100vh" }}>
//             <div className="container-xl py-3">
//                 <div className="row g-3">
//                     {/* Main Content */}
//                     <div className="col-lg-8">
//                         {/* Header */}
//                         <div className="mb-3">
//                             <h1 className="h4 text-dark mb-1 fw-semibold">Chỉnh sửa câu hỏi</h1>
//                             <p className="text-muted mb-0 small">Cải thiện câu hỏi để nhận được câu trả lời tốt hơn</p>
//                         </div>

//                         {/* Revision Selection */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
//                                     <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small">Lịch sử chỉnh sửa</label>
//                             </div>
//                             <select className="form-select form-select-sm" onChange={(e) => getRevision(e)}>
//                                 <option value="">Chọn phiên bản để xem</option>
//                                 {listRevisionsPost &&
//                                     listRevisionsPost.length > 0 &&
//                                     listRevisionsPost.map((revision) => (
//                                         <option value={revision.id} key={revision.id}>
//                                             {revision.display_name} - {revision.createdAt} - {revision.edit_summary}
//                                         </option>
//                                     ))}
//                             </select>
//                         </div>

//                         {/* Title Section */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small">Tiêu đề</label>
//                             </div>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Mô tả cụ thể vấn đề của bạn"
//                                 value={titleQuestion}
//                                 onChange={getTitleQuestion}
//                                 style={{ fontSize: "14px" }}
//                             />
//                             <div className="mt-1">
//                                 <small className={`${titleQuestion.length >= 15 ? "text-success" : "text-danger"}`}>
//                                     {titleQuestion.length}/15 ký tự tối thiểu
//                                 </small>
//                             </div>
//                         </div>

//                         {/* Detail Section */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
//                                     <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small">Mô tả chi tiết</label>
//                             </div>
//                             <div className="border rounded overflow-hidden">
//                                 <Editor
//                                     getContentEditor={getContentEditor}
//                                     id={0}
//                                     getPlainTextEditor={getPlainTextEditor}
//                                     initialHtml={detailQuestion}
//                                     resetPage={resetPage}
//                                 />
//                             </div>
//                             <div className="mt-1">
//                                 <small className={`${plainTextDeTailQuestion.length >= 40 ? "text-success" : "text-danger"}`}>
//                                     {plainTextDeTailQuestion.length}/40 ký tự tối thiểu
//                                 </small>
//                             </div>
//                         </div>

//                         {/* Images Section */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
//                                     <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small">Hình ảnh</label>
//                             </div>
//                             <UploadAndDisplayImage getImage={getImage} initialImage={imageQuestions} resetPage={resetPage} />
//                         </div>

//                         {/* Tags Section */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small" htmlFor="multiple-select-field">
//                                     Thẻ chủ đề
//                                 </label>
//                             </div>
//                             <select
//                                 className="form-select form-select-sm"
//                                 id="multiple-select-field"
//                                 data-placeholder="Chọn thẻ mô tả chủ đề"
//                                 multiple
//                             >
//                                 {listTags &&
//                                     listTags.length > 0 &&
//                                     listTags.map((tag) => (
//                                         <option key={tag.id} value={tag.id}>
//                                             {tag.tag_name}
//                                         </option>
//                                     ))}
//                             </select>
//                         </div>

//                         {/* Edit Summary */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex align-items-center mb-2">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
//                                 </svg>
//                                 <label className="form-label mb-0 fw-medium small">Tóm tắt chỉnh sửa</label>
//                             </div>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Mô tả ngắn gọn về thay đổi"
//                                 value={editSummary}
//                                 onChange={getEditSummary}
//                                 style={{ fontSize: "14px" }}
//                             />
//                             <div className="mt-1">
//                                 <small className={`${editSummary.length >= 10 ? "text-success" : "text-danger"}`}>
//                                     {editSummary.length}/10 ký tự tối thiểu
//                                 </small>
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="bg-white border rounded-2 p-3 mb-3">
//                             <div className="d-flex gap-2">
//                                 <button
//                                     type="button"
//                                     className="btn btn-primary btn-sm px-3"
//                                     onClick={handleSaveChanges}
//                                     disabled={isLoading}
//                                     style={{ fontSize: "14px" }}
//                                 >
//                                     {isLoading ? (
//                                         <>
//                                             <span className="spinner-border spinner-border-sm me-1" role="status"></span>
//                                             Đang lưu...
//                                         </>
//                                     ) : (
//                                         "Lưu chỉnh sửa"
//                                     )}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     className="btn btn-outline-secondary btn-sm px-3"
//                                     onClick={handleQuit}
//                                     style={{ fontSize: "14px" }}
//                                 >
//                                     Hủy bỏ
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Comments Section */}
//                         <div className="bg-white border rounded-2 p-3">
//                             <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
//                                 <svg width="16" height="16" fill="currentColor" className="text-muted me-2" viewBox="0 0 16 16">
//                                     <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
//                                 </svg>
//                                 <h6 className="mb-0 fw-medium">Bình luận</h6>
//                             </div>
//                             <ListComments idPost={idpost} />
//                         </div>
//                     </div>

//                     {/* Sidebar */}
//                     <div className="col-lg-4">
//                         <div className="sticky-top" style={{ top: "1rem" }}>
//                             {/* Progress */}
//                             <div className="bg-white border rounded-2 p-3 mb-3">
//                                 <h6 className="fw-medium mb-2 small">Tiến độ hoàn thành</h6>
//                                 <div className="mb-2">
//                                     <div className="d-flex justify-content-between align-items-center mb-1">
//                                         <small className="text-muted">Tiêu đề</small>
//                                         <small className={titleQuestion.length >= 15 ? "text-success" : "text-muted"}>
//                                             {titleQuestion.length >= 15 ? "✓" : `${titleQuestion.length}/15`}
//                                         </small>
//                                     </div>
//                                     <div className="progress" style={{ height: "3px" }}>
//                                         <div
//                                             className={`progress-bar ${titleQuestion.length >= 15 ? "bg-success" : "bg-warning"}`}
//                                             style={{ width: `${Math.min((titleQuestion.length / 15) * 100, 100)}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-2">
//                                     <div className="d-flex justify-content-between align-items-center mb-1">
//                                         <small className="text-muted">Nội dung</small>
//                                         <small className={plainTextDeTailQuestion.length >= 40 ? "text-success" : "text-muted"}>
//                                             {plainTextDeTailQuestion.length >= 40 ? "✓" : `${plainTextDeTailQuestion.length}/40`}
//                                         </small>
//                                     </div>
//                                     <div className="progress" style={{ height: "3px" }}>
//                                         <div
//                                             className={`progress-bar ${plainTextDeTailQuestion.length >= 40 ? "bg-success" : "bg-warning"}`}
//                                             style={{ width: `${Math.min((plainTextDeTailQuestion.length / 40) * 100, 100)}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="d-flex justify-content-between align-items-center mb-1">
//                                         <small className="text-muted">Tóm tắt</small>
//                                         <small className={editSummary.length >= 10 ? "text-success" : "text-muted"}>
//                                             {editSummary.length >= 10 ? "✓" : `${editSummary.length}/10`}
//                                         </small>
//                                     </div>
//                                     <div className="progress" style={{ height: "3px" }}>
//                                         <div
//                                             className={`progress-bar ${editSummary.length >= 10 ? "bg-success" : "bg-warning"}`}
//                                             style={{ width: `${Math.min((editSummary.length / 10) * 100, 100)}%` }}
//                                         ></div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Tips */}
//                             <div className="bg-white border rounded-2 p-3 mb-3">
//                                 <h6 className="fw-medium mb-2 small">Mẹo chỉnh sửa</h6>
//                                 <div className="small text-muted lh-sm">
//                                     <div className="mb-2">• Tiêu đề ngắn gọn, mô tả chính xác vấn đề</div>
//                                     <div className="mb-2">• Bao gồm code và thông báo lỗi</div>
//                                     <div className="mb-2">• Sử dụng thẻ phù hợp</div>
//                                     <div>• Kiểm tra chính tả trước khi lưu</div>
//                                 </div>
//                             </div>

//                             {/* Guidelines */}
//                             <div className="bg-white border rounded-2 p-3">
//                                 <h6 className="fw-medium mb-2 small">Quy tắc</h6>
//                                 <div className="alert alert-light border-0 p-2 mb-0" style={{ fontSize: "13px" }}>
//                                     <small className="text-muted">
//                                         Chỉnh sửa phải cải thiện chất lượng câu hỏi. Tránh thay đổi ý nghĩa gốc.
//                                     </small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EditQuestion
