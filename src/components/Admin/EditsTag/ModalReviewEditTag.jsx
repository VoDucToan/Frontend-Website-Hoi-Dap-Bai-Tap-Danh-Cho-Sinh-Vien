import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './ModalReviewEditTag.scss';
import { getUser } from '../../../services/apiUserService';
import _ from 'lodash';
import htmldiff from '../../../utils/HTMLDiff/htmldiff';
import '../../../utils/HTMLDiff/htmldiff.scss';
import { getTag } from '../../../services/apiTagService';
import ProposedAuthor from '../../Users/ProposedAuthor';
import { toast } from 'react-toastify';
import Tag from '../../Tags/Tag';
import { approveEditForTag, getEditTag, getImagesForEditTag, rejectEditForTag } from '../../../services/apiEditTagService';

function ModalReviewEditTag(props) {
    const { idTag, editTagWiki, idEdit, nameUser, proposedTime, editTagSummary,
        editStatus, editSummary, previousEditId, editTagName, avatarProposedAuthor,
        editedByUser
    } = props;

    const [show, setShow] = useState(false);
    const [tag, setTag] = useState({});
    const [user, setUser] = useState({});
    const [editedTag, setEditedTag] = useState({})
    const [imagesEditedTag, setImagesEditedTag] = useState([]);
    const [imagesEdit, setImagesEdit] = useState([]);

    const fetchEditedTag = async () => {
        const res = await getEditTag(previousEditId)
        if (res && res.EC === 0) {
            setEditedTag(res.DT);
        }
    }

    const fetchImagesEditedTag = async () => {
        const data = await getImagesForEditTag(previousEditId);
        setImagesEditedTag(data.DT);
    }

    useEffect(() => {
        fetchEditedTag();
        fetchImagesEditedTag();
    }, [previousEditId])

    const fetchImagesEdit = async () => {
        const data = await getImagesForEditTag(idEdit);
        setImagesEdit(data.DT);
    }

    useEffect(() => {
        fetchImagesEdit();
    }, [idEdit])

    const fetchTag = async () => {
        const res = await getTag(idTag);
        if (res && res.EC === 0) {
            setTag(res.DT);
        }
    }

    useEffect(() => {
        fetchTag();
    }, [idTag])

    const fetchUser = async () => {
        const res = await getUser(tag.created_by_user_id);
        if (res && res.EC === 0) {
            setUser(res.DT[0]);
        }
    }

    useEffect(() => {
        if (!_.isEmpty(tag)) {
            fetchUser();
        }
    }, [tag])

    useEffect(() => {
        if (!_.isEmpty(editedTag) && show) {
            let outputTagWiki = htmldiff(editedTag.tag_description, editTagWiki)
            document.getElementById("id-content-edit-tag-revision-detail-tag-wiki").innerHTML = outputTagWiki;

            // let outputTagName = htmldiff(editedTag.tag_name, editTagName)
            // document.getElementById("id-content-edit-tag-revision-detail-tag-name").innerHTML = outputTagName;

            let outputTagSummary = htmldiff(editedTag.tag_summary, editTagSummary)
            document.getElementById("id-content-edit-tag-revision-detail-tag-summary").innerHTML = outputTagSummary;
        }

    }, [editedTag, editTagWiki, editTagName, editTagSummary, show])

    function escapeHtml(str = '') {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    const buildTagsHtml = (tagName) => {
        return `<div class="meta-tags"><ul class="meta-list-tags">` +
            `<li class="meta-tag">${escapeHtml(tagName)}</li>` +
            `</ul></div>`;
    }

    const fetchDiffListTags = () => {
        const htmlListTagsEditedQuestion = buildTagsHtml(editedTag.tag_name);
        const htmlListTagsEdit = buildTagsHtml(editTagName);

        let output = htmldiff(htmlListTagsEditedQuestion, htmlListTagsEdit);
        document.getElementById("id-content-edit-tag-revision-detail-tag-name").innerHTML = output;
    }

    useEffect(() => {
        if (show && editTagName && editedTag) {
            fetchDiffListTags();
        }
    }, [show, editTagName, editedTag])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleReject = async () => {
        const reply = window.confirm("Bạn muốn từ chối chỉnh sửa này?");
        if (reply) {
            const res = await rejectEditForTag(idEdit, editedByUser, "Chỉnh sửa",
                "Bản chỉnh sửa của bạn bị từ chối", `/edit-tag-wiki/${idTag}`);
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
            const res = await approveEditForTag(idEdit, editedByUser, "Chỉnh sửa",
                "Bản chỉnh sửa của bạn được chấp nhận", `/tags/${idTag}/info`);
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
            <button className="btn btn-info" onClick={handleShow}>Đánh giá</button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Đánh Giá Chỉnh Sửa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='review-suggested-edit-tag-container'>
                        <div className='following-edit-tag'>
                            <h4>Đánh giá chỉnh sửa cho thẻ</h4>
                            <div className='tag-summary-stats'>
                                <span className='number-views'>
                                    3582399 Lượt xem
                                </span>
                            </div>
                            <div className='tag-summary-content'>
                                <div>
                                    <h5 className="d-inline">Thông tin về </h5>
                                    <Tag tag={tag} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='content-edit-tag'>
                            <Tabs
                                defaultActiveKey="revision"
                                className="mb-3"
                            >
                                <Tab eventKey="revision" title="Sửa đổi">
                                    <div className='content-edit-tag-revision'>
                                        <div className="content-edit-tag-revision-detail">
                                            <span className='content-edit-tag-revision-detail-edit-summary'>
                                                Tổng quan chỉnh sửa: {editSummary}
                                            </span>

                                            <div className="content-edit-tag-revision-detail-tag-name"
                                                id="id-content-edit-tag-revision-detail-tag-name">
                                            </div>

                                            <div className="content-edit-tag-revision-detail-tag-summary"
                                                id="id-content-edit-tag-revision-detail-tag-summary">
                                            </div>

                                            <div className="content-edit-tag-revision-detail-tag-wiki"
                                                id="id-content-edit-tag-revision-detail-tag-wiki">
                                            </div>

                                            <div className='content-edit-tag-revision-detail-images'>
                                                <div className='content-edit-tag-revision-detail-images-tag'>
                                                    <h5>Hình ảnh câu hỏi</h5>
                                                    {imagesEditedTag && imagesEditedTag.length > 0 &&
                                                        imagesEditedTag.map((image, index) => {
                                                            return (
                                                                <img src={`${process.env.REACT_APP_URL_NODE}/images/uploads/${image.file_name}`}
                                                                    className='img-thumbnail' key={index} />
                                                            )
                                                        })}
                                                </div>
                                                <div className='content-edit-tag-revision-detail-images-edit'>
                                                    <h5>Hình ảnh chỉnh sửa</h5>
                                                    {imagesEdit && imagesEdit.length > 0 && imagesEdit.map((image, index) => {
                                                        return (
                                                            <img src={`${process.env.REACT_APP_URL_NODE}/images/uploads/${image.file_name}`}
                                                                className='img-thumbnail' key={index} />
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <ProposedAuthor avatarAuthor={`${process.env.REACT_APP_URL_NODE}/images/uploads/${avatarProposedAuthor}`}
                                                nameUser={nameUser}
                                                proposedTime={proposedTime} />
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    {editStatus === 0 &&
                        (
                            <>
                                <Button variant="success" onClick={() => handleApprove()}>
                                    Chấp nhận
                                </Button>
                                <Button variant="danger" onClick={() => handleReject()}>
                                    Từ chối
                                </Button>
                            </>
                        )}

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalReviewEditTag;