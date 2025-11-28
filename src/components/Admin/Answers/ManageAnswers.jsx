import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAnswers } from "../../../services/apiAnswerService";
import ModalUpdateAnswer from "./ModalUpdateAnswer";

const ManageAnswers = () => {
    const [answers, setAnswers] = useState([]);
    const [resetPage, setResetPage] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchAnswers = async () => {
        if (page && limit) {
            const data = await getAnswers(page, limit);
            if (data?.EC === 0) {
                setAnswers(data.DT.answers);
                setTotalPages(data.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        fetchAnswers();
    }, [resetPage, page, limit])

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="manage-answers-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Phiếu bầu</th>
                        <th scope="col">Tác giả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian tạo</th>
                        <th scope="col">Thời gian chỉnh sửa</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {answers?.length > 0 && answers.map((answer) => {
                        return (
                            <tr key={answer.id}>
                                <th scope="row">{answer.id}</th>
                                <td>{answer.voteCount}</td>
                                <td>{answer.display_name}</td>
                                <td>{answer.post_status ? "Kích hoạt" : "Không kích hoạt"}</td>
                                <td>{answer.createdAt}</td>
                                <td>{answer.updatedAt}</td>
                                <td>
                                    <ModalUpdateAnswer status={answer.post_status}
                                        detail={answer.post_details} id={answer.id}
                                        resetPage={handleResetPage} />
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

export default ManageAnswers;