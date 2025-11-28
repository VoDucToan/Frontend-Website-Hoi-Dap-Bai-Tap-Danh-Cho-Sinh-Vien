import { useEffect, useState } from "react";
import { getListTags } from "../../../services/apiTagService";
import ReactPaginate from "react-paginate";
import ModalUpdateTag from "./ModalUpdateTag";

const ManageTags = () => {
    const [tags, setTags] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchTags = async () => {
        const res = await getListTags(page, limit);
        if (res && res.EC === 0) {
            setTags(res.DT.tags);
            setTotalPages(res.DT.totalPages);
        }
    }

    useEffect(() => {
        fetchTags();
    }, [page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="manage-tags-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên thẻ</th>
                        <th scope="col">Tổng quát về thẻ</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian tạo</th>
                        <th scope="col">Thời gian chỉnh sửa</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tags && tags.length > 0 && tags.map((tag, index) => {
                        return (
                            <tr key={tag.id}>
                                <th scope="row">{tag.id}</th>
                                <td>{tag.tag_name}</td>
                                <td>{tag.tag_summary}</td>
                                <td>{tag.display_name}</td>
                                <td>{tag.tag_status ? "Kích hoạt" : "Không kích hoạt"}</td>
                                <td>{tag.createdAt}</td>
                                <td>{tag.updatedAt}</td>
                                <td>
                                    <ModalUpdateTag tagname={tag.tag_name} tagsummary={tag.tag_summary}
                                        status={tag.tag_status} tagwiki={tag.tag_description}
                                        fetchTags={fetchTags} idtag={tag.id} />
                                    {/* <button className="btn btn-danger"
                                    // onClick={() => handleDeleteQuestion(question.id)}
                                    >Xóa</button> */}
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

export default ManageTags;