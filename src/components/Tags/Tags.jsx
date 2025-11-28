import { IoIosSearch } from "react-icons/io";
import './Tags.scss';
import TagBrowser from "./TagBrowser";
import { useEffect, useState } from "react";
import { getListTags } from "../../services/apiTagService";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Tags = () => {
    const [tags, setTags] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true);

    const fetchTags = async () => {
        if (page && limit) {
            const res = await getListTags(page, limit, true, search);
            if (res && res.EC === 0) {
                setTags(res.DT.tags);
                setTotalPages(res.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        if (isFirstRender) {
            fetchTags();
            setIsFirstRender(false);
        }
        else {
            const handler = setTimeout(() => fetchTags(), 500);
            return () => clearTimeout(handler);
        }
    }, [page, limit, search])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    const getSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    return (
        <div className="tags-container">
            <div className="d-flex justify-content-between">
                <h4>Danh sách thẻ</h4>
                <Link to='/tags/create'>
                    <button type="button" class="btn btn-primary">Tạo thẻ mới</button>
                </Link>
            </div>
            <span>Thẻ là một từ khóa hoặc nhãn để phân loại các câu hỏi với nhau
                hoặc nhận biết các câu hỏi tương tự.<br />Sử dụng thẻ hợp lý để dễ dàng hơn
                cho mọi người tìm và trả lời câu hỏi của bạn.</span>
            <div className='find-tags'>
                <div className='search-tags'>
                    <span className='icon-search-tags'>
                        <IoIosSearch />
                    </span>
                    <input type="text" className="form-control input-search-tags" placeholder="Tìm kiếm thẻ"
                        value={search} onChange={(e) => getSearch(e)} />
                </div>
                <div className='filter-tags'></div>
            </div>
            <div className="list-tags">
                {tags && tags.length > 0 && tags.map((tag) => {
                    return (
                        <TagBrowser key={tag.id} tag={tag} />
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

export default Tags;