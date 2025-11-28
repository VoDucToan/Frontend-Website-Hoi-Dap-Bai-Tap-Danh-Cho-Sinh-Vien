import SummaryTitleQuestion from "../Questions/SummaryTitleQuestion";
import './VoteQuestion.scss';

const VoteQuestion = (props) => {
    const { voteType, idQuestion, titleQuestion, postType, votedTime } = props;
    return (
        <div className="vote-question-container">
            <span className="text-vote">
                {voteType === 1 ?
                    "Bình chọn tăng "
                    :
                    "Bình chọn giảm"
                }
            </span>
            <SummaryTitleQuestion idQuestion={idQuestion} titleQuestion={titleQuestion}
                postType={postType} />
            <span className="voted-time">{votedTime}</span>
        </div>
    )
}

export default VoteQuestion;