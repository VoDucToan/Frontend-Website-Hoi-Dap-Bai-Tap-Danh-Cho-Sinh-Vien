import { Link } from "react-router-dom";
import './SummaryTitleQuestion.scss';
import { FaQuestionCircle } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const SummaryTitleQuestion = (props) => {
    const { idQuestion, titleQuestion, postType, idAnswer } = props;

    return (
        <div className="summary-title-question">
            {postType === 1 ?
                (
                    <span className="icon-post-result">
                        <FaQuestionCircle />
                    </span>
                )
                : postType === 2 ?
                    (
                        <span className="icon-post-result">
                            <MdQuestionAnswer />
                        </span>
                    )
                    : (<></>)
            }
            <Link to={`/questions/${idQuestion}`}
                state={{ idTargetAnswer: idAnswer }}>
                <span>{titleQuestion}</span>
            </Link>
        </div>
    )
}

export default SummaryTitleQuestion;