import { FaSpinner } from "react-icons/fa";
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading-container">
            <FaSpinner className="loading-spinner" />
            <span>Đang tải...</span>
        </div>
    )
}

export default Loading;