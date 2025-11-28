import './AnswerUser.scss';
import { useEffect, useState } from "react";
import { getQuestions } from "../../services/apiQuestionService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import { getNumberVotesPost } from "../../services/apiVoteService";
import SummaryMetaQuestion from "../Questions/SummaryMetaQuestion";
import SummaryStatsAnswer from "./SummaryStatsAnswer";

const AnswerUser = (props) => {
    const { answer } = props;

    const [numberVotes, setNumberVotes] = useState(0);
    const [question, setQuestion] = useState({});
    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);

    const fetchQuestion = async () => {
        if (answer?.parent_question_id) {
            const res = await getQuestions(answer.parent_question_id);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [answer])

    const fetchListTagsByQuestion = async () => {
        if (question?.id) {
            const data = await getListTagsByQuestion(question.id);
            setListTagsByQuestion(data.DT);
        }
    }

    useEffect(() => {
        fetchListTagsByQuestion();
    }, [question])

    const fetchNumberVotes = async () => {
        if (answer?.id) {
            let data = await getNumberVotesPost(answer.id);
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchNumberVotes();
    }, [answer])


    return (
        <div className="answer-answered-container">
            <SummaryStatsAnswer
                numberVotes={numberVotes}
                idAnswer={answer.id}
                idAcceptedAnswer={question.accepted_answer_id} />
            <SummaryMetaQuestion
                idQuestion={question.id}
                idAnswer={answer.id}
                titleQuestion={question.post_title}
                listTags={listTagsByQuestion}
                postType={answer.post_type_id}
                questionAskedTime={answer.askedTime}
            />
        </div>
    )
}

export default AnswerUser;