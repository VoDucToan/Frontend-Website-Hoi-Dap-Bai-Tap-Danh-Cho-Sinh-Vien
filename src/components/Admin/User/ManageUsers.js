import { useEffect, useState } from "react";
import { getListUsers } from "../../../services/apiUserService";
import ModalUpdateUser from "./ModalUpdateUser";
import ReactPaginate from "react-paginate";

const ManageUsers = () => {
    const [listUsers, setListUsers] = useState([]);
    const [resetPage, setResetPage] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchListUsers = async () => {
        if (page && limit) {
            const data = await getListUsers(page, limit);
            if (data && data.EC === 0) {
                setListUsers(data?.DT.users);
                setTotalPages(data.DT.totalPages);
            }
        }

    }

    useEffect(() => {
        fetchListUsers();
    }, [resetPage, page, limit])

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="manage-users-container">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Role</th>
                        <th scope="col">VerifyEmail</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Updated Date</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.display_name}</td>
                                <td>{user.email_address}</td>
                                <td>{user.role_id === 1 ? 'User' : "Admin"}</td>
                                <td>{user.is_verify_email ? 'true' : 'false'}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.updatedAt}</td>
                                <td>
                                    <ModalUpdateUser id={user.id} username={user.display_name} email={user.email_address}
                                        role={user.role_id} isverifyemail={user.is_verify_email} createdate={user.createdAt}
                                        updatedate={user.updatedAt} location={user.location} aboutme={user.about_me}
                                        resetPage={handleResetPage} fetchListUsers={fetchListUsers} image={user.avatar_file_name} />
                                    {/* <button className="btn btn-danger" >Delete</button> */}
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

export default ManageUsers;