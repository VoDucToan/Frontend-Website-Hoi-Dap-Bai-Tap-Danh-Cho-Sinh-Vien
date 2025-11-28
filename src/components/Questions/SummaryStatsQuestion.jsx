import './SummaryStatsQuestion.scss';
import { ImCheckmark } from "react-icons/im";

const SummaryStatsQuestion = (props) => {
    const { amountVotes, amountAnswers, amountViews,
        idAcceptedAnswer, isColumn
    } = props;
    return (
        <div className={"post-summary-stats" + (isColumn ? " post-summary-stats-column" : "")}>
            <span className='number-votes'>
                {amountVotes} phiếu bầu
            </span>
            {idAcceptedAnswer ?
                (
                    <span className='number-answers-accepted'>
                        <ImCheckmark /> {amountAnswers} trả lời
                    </span>
                )
                : (
                    <span className='number-answers'>
                        {amountAnswers} trả lời
                    </span>
                )
            }
            {/* <span className='number-views'>
                3582399 lượt xem
            </span> */}
        </div>
    )
}

export default SummaryStatsQuestion;