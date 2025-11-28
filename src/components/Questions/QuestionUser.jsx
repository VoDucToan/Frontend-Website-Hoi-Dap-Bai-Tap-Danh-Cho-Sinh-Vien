import { useEffect, useState } from "react";
import { getNumberAnswers } from "../../services/apiAnswerService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import { getNumberVotesPost } from "../../services/apiVoteService";
import SummaryMetaQuestion from "./SummaryMetaQuestion";
import SummaryStatsQuestion from "./SummaryStatsQuestion";
import './QuestionUser.scss';

const QuestionUser = (props) => {
    const { question } = props;

    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);
    const [numberVotes, setNumberVotes] = useState(0);
    const [numberAnswers, setNumberAnswers] = useState(0);

    const fetchListTagsByQuestion = async () => {
        if (question?.id) {
            const data = await getListTagsByQuestion(question.id);
            setListTagsByQuestion(data.DT);
        }
    }

    const fetchNumberAnswers = async () => {
        if (question?.id) {
            let data = await getNumberAnswers(question.id);
            setNumberAnswers(data.DT);
        }

    }

    const fetchNumberVotes = async () => {
        if (question?.id) {
            let data = await getNumberVotesPost(question.id);
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchListTagsByQuestion();
        fetchNumberAnswers();
        fetchNumberVotes();
    }, [question])

    return (
        <div className="question-asked-container">
            <SummaryStatsQuestion
                amountVotes={numberVotes}
                amountAnswers={numberAnswers}
                idAcceptedAnswer={question.accepted_answer_id}
            />
            <SummaryMetaQuestion
                idAuthor={question.created_by_user_id}
                idQuestion={question.id}
                titleQuestion={question.post_title}
                listTags={listTagsByQuestion}
                questionAskedTime={question.askedTime}
            />
        </div>
    )
}

export default QuestionUser;