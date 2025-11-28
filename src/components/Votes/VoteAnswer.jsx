import { useEffect, useState } from 'react';
import { getQuestions } from '../../services/apiQuestionService';
import SummaryTitleQuestion from '../Questions/SummaryTitleQuestion';
import './VoteAnswer.scss';

const VoteAnswer = (props) => {
    const { voteType, idAnswer, idQuestion, postType, votedTime } = props;
    const [question, setQuestion] = useState({});

    const fetchQuestion = async () => {
        if (idQuestion) {
            const res = await getQuestions(idQuestion);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [idQuestion])

    return (
        <div className="vote-answer-container">
            <span className="text-vote">
                {voteType === 1 ?
                    "Bình chọn tăng "
                    :
                    "Bình chọn giảm"
                }
            </span>
            <SummaryTitleQuestion idQuestion={idQuestion} titleQuestion={question.post_title}
                postType={postType} idAnswer={idAnswer} />
            <span className="voted-time">{votedTime}</span>
        </div>
    )
}

export default VoteAnswer;