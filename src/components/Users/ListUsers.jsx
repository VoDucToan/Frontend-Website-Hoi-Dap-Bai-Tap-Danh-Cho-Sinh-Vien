import { useEffect, useState } from 'react';
import './ListUsers.scss'
import UserBrowser from './UserBrowser';
import { IoIosSearch } from "react-icons/io";
import { getListUsers } from '../../services/apiUserService';
import ReactPaginate from 'react-paginate';

const ListUsers = () => {
    const [listUsers, setListUsers] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true);

    const fetchListUsers = async () => {
        if (page && limit) {
            const res = await getListUsers(page, limit, search);
            if (res && res.EC === 0) {
                setListUsers(res.DT.users);
                setTotalPages(res.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        if (isFirstRender) {
            fetchListUsers();
            setIsFirstRender(false);
        }
        else {
            const handler = setTimeout(() => fetchListUsers(), 500);
            return () => clearTimeout(handler);
        }
    }, [page, limit, search])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    const getSearch = (e) => {
        setSearch(e.target.value)
        setPage(1);
    }

    return (
        <div className='list-users-container'>
            <h4>Danh sách người dùng</h4>
            <div className='find-users'>
                <div className='search-users'>
                    <span className='icon-search-users'>
                        <IoIosSearch />
                    </span>
                    <input type="text" className="form-control input-search-users" placeholder="Tìm kiếm người dùng"
                        value={search} onChange={(e) => getSearch(e)} />
                </div>
                <div className='filter-users'></div>
            </div>
            <div className='list-users'>
                {listUsers && listUsers.length > 0 && listUsers.map((user) => {
                    return (
                        <UserBrowser user={user} key={user.id} />
                    )
                })}

            </div>
            <ReactPaginate
                nextLabel="sau >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                forcePage={page - 1}
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

export default ListUsers