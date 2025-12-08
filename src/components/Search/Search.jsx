import { useEffect, useState } from "react";
import { searchPosts } from "../../services/apiPostService";
import ButtonAskQuestion from "../Questions/ButtonAskQuestion";
import MetaQuestion from "../Questions/MetaQuestion";
import './Search.scss'
import { useSearchParams } from "react-router-dom";
import PostResult from "./PostResult";
import ReactPaginate from "react-paginate";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const textSearch = searchParams.get("textSearch");

    const fetchResults = async () => {
        if (page && limit && textSearch) {
            const res = await searchPosts(page, limit, textSearch);
            if (res && res.EC === 0) {
                setResults(res.DT.results);
                setTotalPages(res.DT.totalPages);
            }
        }
    }

    useEffect(() => {
        fetchResults();
    }, [page, limit, textSearch])

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    }

    return (
        <div className="search-container">
            <div className="head-search">
                <h4>Kết Quả Tìm Kiếm</h4>
                <ButtonAskQuestion />
            </div>
            <div className="options-search">
                <span className="options-search-text">Kết quả cho {textSearch}</span>
            </div>
            <div className="options-result">
                <span className="amount-result">{results.length} kết quả</span>
            </div>
            <div className="results-container">
                {results?.length > 0 && results.map((result) => {
                    return (
                        <PostResult result={result} key={result.id} />
                    )
                })}
            </div>
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

export default Search;