import Inbox from "./Inbox";
import { IoSchool } from "react-icons/io5";
import './Inboxes.scss';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getListNotificationsByUser } from "../../services/apiNotificationService";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Inboxes = () => {
    const [inboxes, setInboxes] = useState([]);
    const idUser = useSelector(state => state.auth.user.id);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const fetchListNotifications = async () => {
        if (idUser && page && limit) {
            const res = await getListNotificationsByUser(idUser, false, page, limit);
            if (res && res.EC === 0) {
                setInboxes(res.DT.listNotifications);
                setTotalPages(res.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        fetchListNotifications();
    }, [idUser, page, limit])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="inboxes-container">
            <table className="table table-hover table-borderless align-middle table-secondary">
                <tbody>
                    {inboxes?.length > 0 && inboxes.map((inbox) => {
                        return (
                            <tr className="inbox" key={inbox.id}
                                onClick={() => navigate(`${inbox.notification_resource}`)}>
                                <td >{inbox.noticedTime}</td>
                                <td ><IoSchool /></td>
                                <td >{inbox.notification_type}</td>
                                <td >{inbox.notification_summary}</td>
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
        </div >
    )
}

export default Inboxes;