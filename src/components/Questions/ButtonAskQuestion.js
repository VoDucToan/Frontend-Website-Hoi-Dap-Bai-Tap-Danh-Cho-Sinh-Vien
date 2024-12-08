import { Link } from "react-router-dom";

const ButtonAskQuestion = (props) => {
    return (
        <Link to='/questions/ask'>
            <button type="button" className="btn btn-primary btn-sm btn-customize">Đặt câu hỏi</button>
        </Link>
    )
}

export default ButtonAskQuestion;