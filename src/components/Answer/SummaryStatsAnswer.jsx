import { ImCheckmark } from "react-icons/im";
import './SummaryStatsAnswer.scss';

const SummaryStatsAnswer = (props) => {
    const { numberVotes, idAnswer, idAcceptedAnswer } = props;
    return (
        <div className="stats-answer-container">
            <span className="amount-votes">{numberVotes} phiếu bầu</span>
            {idAnswer === idAcceptedAnswer && (
                <span className="p-1 bg-success text-white icon-accepted-answer">
                    <ImCheckmark /> Đã chấp nhận
                </span>
            )}
        </div>
    )
}

export default SummaryStatsAnswer;