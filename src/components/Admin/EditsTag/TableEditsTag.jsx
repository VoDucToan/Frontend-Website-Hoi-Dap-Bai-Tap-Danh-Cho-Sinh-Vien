import ReactPaginate from "react-paginate";
import { getListEdits } from "../../../services/apiEditPostService";
import { useEffect, useState } from "react";
import { getListEditsTag } from "../../../services/apiEditTagService";
import ModalReviewEditTag from "./ModalReviewEditTag";

const TableEditsTag = (props) => {
    const { editStatus } = props

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listEditsTag, setListEditsTag] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchListEditTag = async () => {
        const data = await getListEditsTag(editStatus, page, limit);
        if (data && data.EC === 0) {
            setListEditsTag(data.DT.editsTag);
            setTotalPages(data.DT.totalPages);
        }
    }

    useEffect(() => {
        fetchListEditTag();
    }, [editStatus, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="table-edit-tag-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Chỉnh sửa bởi</th>
                        <th scope="col">Tên thẻ</th>
                        <th scope="col">Tổng quan chỉnh sửa</th>
                        <th scope="col">Thời gian tạo</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listEditsTag && listEditsTag.length > 0 && listEditsTag.map((edit) => {
                        return (
                            <tr key={edit.id}>
                                <th scope="row">{edit.id}</th>
                                <td>{edit.display_name}</td>
                                <td>{edit.tag_name}</td>
                                <td>{edit.edit_summary}</td>
                                <td>{edit.createdAt}</td>
                                <td>{edit.edit_status === 0 ? "Đang chờ" : edit.edit_status === 1 ? "Chấp nhận" : "Từ chối"}</td>
                                <td>
                                    <ModalReviewEditTag idTag={edit.tag_id}
                                        editTagWiki={edit.tag_description}
                                        editTagName={edit.tag_name}
                                        editTagSummary={edit.tag_summary}
                                        idEdit={edit.id}
                                        nameUser={edit.display_name}
                                        proposedTime={edit.proposedTime}
                                        editStatus={edit.edit_status}
                                        editSummary={edit.edit_summary}
                                        previousEditId={edit.previous_edit_id}
                                        avatarProposedAuthor={edit.avatar_file_name}
                                        editedByUser={edit.edited_by_user_id} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ReactPaginate
                nextLabel="sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< trước"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </div>

    )
}

export default TableEditsTag;