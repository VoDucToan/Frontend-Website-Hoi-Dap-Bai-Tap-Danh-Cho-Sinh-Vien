import ReactPaginate from "react-paginate";
import { getListEdits } from "../../../services/apiEditPostService";
import { useEffect, useState } from "react";
import ModalReviewEditQuestion from "./ModalReviewEditQuestion";
import ModalReviewEditAnswer from "./ModalReviewEditAnswer";

const TableEdit = (props) => {
    const { editStatus } = props

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listEdits, setListEdits] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchListEdit = async () => {
        if (editStatus && page && limit) {
            const data = await getListEdits(editStatus, page, limit);
            if (data && data.EC === 0) {
                setListEdits(data.DT.edits);
                setTotalPages(data.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        fetchListEdit();
    }, [editStatus, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="table-edit-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Chỉnh sửa bởi</th>
                        <th scope="col">Tổng quan chỉnh sửa</th>
                        <th scope="col">Tiêu đề bài viết</th>
                        <th scope="col">Thời gian tạo</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {listEdits && listEdits.length > 0 && listEdits.map((edit) => {
                        return (
                            <tr key={edit.id}>
                                <th scope="row">{edit.id}</th>
                                <td>{edit.display_name}</td>
                                <td>{edit.edit_summary}</td>
                                <td>{edit.post_title}</td>
                                <td>{edit.createdAt}</td>
                                <td>{edit.edit_status === 0 ? "Đang chờ" : edit.edit_status === 1 ? "Chấp nhận" : "Từ chối"}</td>
                                <td>
                                    {edit.edit_post_type_id === 1 ?
                                        (
                                            <ModalReviewEditQuestion idQuestion={edit.post_id}
                                                editPostDetail={edit.post_details}
                                                editPostTile={edit.post_title}
                                                idEdit={edit.id}
                                                nameUser={edit.display_name}
                                                postProposedTime={edit.proposedTime}
                                                editStatus={edit.edit_status}
                                                editSummary={edit.edit_summary}
                                                previousEditId={edit.previous_edit_id}
                                                avatarProposedAuthor={edit.avatar_file_name}
                                                editedByUser={edit.edited_by_user_id} />
                                        )
                                        :
                                        (
                                            <ModalReviewEditAnswer idAnswer={edit.post_id}
                                                editSummary={edit.edit_summary}
                                                previousEditId={edit.previous_edit_id}
                                                editPostDetail={edit.post_details}
                                                idEdit={edit.id}
                                                postProposedTime={edit.proposedTime}
                                                nameUser={edit.display_name}
                                                editStatus={edit.edit_status}
                                                avatarProposedAuthor={edit.avatar_file_name}
                                                editedByUser={edit.edited_by_user_id} />
                                        )
                                    }
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

export default TableEdit;