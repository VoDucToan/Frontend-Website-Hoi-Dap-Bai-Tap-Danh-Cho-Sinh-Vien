import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../utils/Editor/Editor";
import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import { editTag, getEditTagForUser, getImagesForEditTag, updateEditTag } from "../../services/apiEditTagService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditTag = () => {
    const { idtag } = useParams();
    const navigate = useNavigate();
    const idUser = useSelector(state => state.auth.user.id);

    const [editStatus, setEditStatus] = useState(0);
    const [idEditTag, setIdEditTag] = useState(0);
    const [tagName, setTagName] = useState("");
    const [tagSummary, setTagSummary] = useState("");
    const [tagWiki, setTagWiki] = useState("");
    const [plainTextTagWiki, setPlainTextTagWiki] = useState("");
    const [initialTagWiki, setInitialTagWiki] = useState("");
    const [imageTag, setImageTag] = useState([]);
    const [initialImageTag, setInitialImageTag] = useState([]);
    const [editSummary, setEditSummary] = useState("");
    const [resetPage, setResetPage] = useState(1);

    const fetchEditTag = async () => {
        const res = await getEditTagForUser(idtag, idUser)
        if (res && res.EC === 0) {
            setTagName(res.DT.tag_name);
            setTagSummary(res.DT.tag_summary);
            setInitialTagWiki(res.DT.tag_description);
            setEditSummary(res.DT.edit_summary);
            setEditStatus(res.DT.edit_status);
            setIdEditTag(res.DT.id);
        }
    }

    useEffect(() => {
        fetchEditTag();
    }, [idtag, idUser])

    const fetchImageEditTag = async () => {
        const resImagesEditTag = await getImagesForEditTag(idEditTag)
        if (resImagesEditTag && resImagesEditTag.EC === 0) {
            const arrDataImagesEditTag = resImagesEditTag.DT.map((imageEditTag) => {
                return `http://localhost:8080/images/uploads/${imageEditTag.file_name}`;
            })
            setInitialImageTag(arrDataImagesEditTag);
        }
    }

    useEffect(() => {
        fetchImageEditTag();
    }, [idEditTag])

    const getTagName = (e) => {
        setTagName(e.target.value)
    }

    const getTagSummary = (e) => {
        setTagSummary(e.target.value);
    }

    const getContentEditor = (content, id) => {
        setTagWiki(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextTagWiki(plainText);
    }

    const getImage = (image) => {
        setImageTag(image);
    }

    const getEditSummary = (e) => {
        setEditSummary(e.target.value);
    }

    const handleQuit = () => {
        navigate(`/tags/${idtag}/info`);
    }

    const validateEditTag = () => {
        if (tagName.length < 5) {
            toast.error("Tên thẻ phải chứa ít nhất 5 ký tự")
            return false;
        }
        if (tagSummary.length < 20) {
            toast.error("Mô tả tổng quát thẻ phải chứa ít nhất 20 ký tự")
            return false;
        }
        if (plainTextTagWiki.length < 20) {
            toast.error("Mô tả chi tiết về thẻ phải chứa ít nhất 20 ký tự")
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        const isValidate = validateEditTag();
        if (!isValidate) {
            return;
        }

        if (editStatus === 0) {
            const dataUpdateEditTag = await updateEditTag(idEditTag, tagName, tagSummary,
                tagWiki, editSummary, imageTag);
            if (dataUpdateEditTag && dataUpdateEditTag.EC === 0) {
                toast.success("Gửi chỉnh sửa thẻ thành công");
                handleQuit();
            }
            else {
                toast.error(dataUpdateEditTag.EM);
            }
        }
        else if (editStatus === 1) {
            const dataEditTag = await editTag(idUser, idtag, tagName, tagSummary, tagWiki,
                editSummary, imageTag, idEditTag);
            if (dataEditTag && dataEditTag.EC === 0) {
                toast.success("Gửi chỉnh sửa thẻ thành công");
                handleQuit();
            }
            else {
                toast.error(dataEditTag.EM);
            }
        }
    }

    return (
        <div className="edit-tag-container">
            <div className="mb-3">
                <h5 className="d-inline">Chỉnh sửa thông tin thẻ </h5>
                <Tag tag={{
                    id: idtag,
                    tag_name: tagName
                }} />
            </div>
            <div className="mb-3">
                <label htmlFor="idTagName" className="form-label fw-bold">Tên thẻ</label>
                <input type="text" className="form-control" id="idTagName"
                    value={tagName} onChange={(e) => getTagName(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="idTagSummary" className="form-label fw-bold">Tổng quát về thẻ</label>
                <textarea className="form-control" id="idTagSummary" rows="3"
                    value={tagSummary} onChange={(e) => getTagSummary(e)}
                ></textarea>
            </div>
            <div className="ask-detail mb-4">
                <span className="fw-bold d-block mb-2">Mô tả chi tiết về thẻ</span>
                <Editor
                    getContentEditor={getContentEditor} id={0} resetPage={resetPage}
                    getPlainTextEditor={getPlainTextEditor} initialHtml={initialTagWiki}
                    initialHeight={"210px"}
                />
            </div>
            <UploadAndDisplayImage getImage={getImage} resetPage={resetPage}
                initialImage={initialImageTag} isMultiple={true}
            />
            <div className="mt-4">
                <label htmlFor="idEditSummary" className="form-label fw-bold">Edit Summary</label>
                <input type="text" className="form-control" id="idEditSummary"
                    placeholder="Giải thích rõ ràng thay đổi của bạn (sửa chỉnh tả, sửa cú pháp, cải thiện format)"
                    value={editSummary} onChange={(e) => getEditSummary(e)}
                />
            </div>
            <button type="button" className="btn btn-primary mt-3" onClick={() => handleSaveChanges()}>Lưu chỉnh sửa</button>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => handleQuit()}>Thoát</button>
        </div>
    )
}

export default EditTag;