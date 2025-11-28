import { useState } from "react";
import Editor from "../../utils/Editor/Editor";
import UploadAndDisplayImage from "../../utils/UploadImage/UploadAndDisplayImage";
import { createTag } from "../../services/apiTagService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateTag = () => {
    const [tagName, setTagName] = useState("");
    const [tagSummary, setTagSummary] = useState("");
    const [tagWiki, setTagWiki] = useState("");
    const [plainTextTagWiki, setPlainTextTagWiki] = useState("");
    const [imageTag, setImageTag] = useState([]);
    const [resetPage, setResetPage] = useState(1);

    const idUser = useSelector(state => state.auth.user.id);

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

    const validateCreateTag = () => {
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

    const clearPage = () => {
        setTagName("");
        setTagSummary("");
        setTagWiki("");
        setPlainTextTagWiki("");
        setImageTag([]);
        setResetPage(Math.random());
    }

    const handleSubmitTag = async () => {
        const isValidate = validateCreateTag();
        if (!isValidate) {
            return;
        }
        const res = await createTag(idUser, tagName, tagSummary, tagWiki, imageTag);
        if (res && res.EC === 0) {
            clearPage();
            toast.success("Gửi thẻ thành công");
        }
        else if (res?.EC === -1) {
            toast.error("Bạn phải đạt được 300 điểm danh tiếng để mở khóa chức năng tạo thẻ mới");
        }
        else {
            toast.error("Gửi thẻ thất bại");
        }
    }

    return (
        <div className="create-tag-container">
            <div className="mb-3">
                <label htmlFor="idTagName" className="form-label fw-bold">Tên thẻ</label>
                <input type="text" className="form-control" id="idTagName" value={tagName}
                    onChange={(e) => getTagName(e)} />
            </div>
            <div className="mb-3">
                <label htmlFor="idTagSummary" className="form-label fw-bold">Tổng quát về thẻ</label>
                <textarea className="form-control" id="idTagSummary" rows="3"
                    value={tagSummary} onChange={(e) => getTagSummary(e)}></textarea>
            </div>
            <div className="ask-detail mb-4">
                <span className="fw-bold d-block mb-2">Mô tả chi tiết về thẻ</span>
                <Editor getContentEditor={getContentEditor} id={0} resetPage={resetPage}
                    getPlainTextEditor={getPlainTextEditor} initialHtml={""} initialHeight={"210px"} />
            </div>
            <UploadAndDisplayImage getImage={getImage} resetPage={resetPage} isMultiple={true} />
            <button type="button" className="btn btn-primary d-block mt-3"
                onClick={() => handleSubmitTag()}>Gửi thẻ</button>
            <button type="button" className="btn btn-danger mt-3"
                onClick={() => {
                    const isConfirm = confirm("Xác nhận xóa bản nháp này?");
                    if (isConfirm) {
                        clearPage()
                    }
                }}>Xóa bản nháp</button>
        </div>
    )
}

export default CreateTag;