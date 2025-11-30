import QuestionSaved from "./QuestionSaved";
import { ImCheckmark } from "react-icons/im";
import MetaAuthor from "../Users/MetaAuthor";
import './AnswerSaved.scss';
import { getQuestions } from '../../services/apiQuestionService';
import { useEffect, useState } from "react";
import { getNumberVotesPost } from "../../services/apiVoteService";
import { getUser } from "../../services/apiUserService";
import { useNavigate } from "react-router-dom";
import SummaryStatsAnswer from "../Answer/SummaryStatsAnswer";

const AnswerSaved = (props) => {
    const { idQuestion, idAnswer, plainAnswer, idUser,
        questionAskedTime
    } = props;

    const navigate = useNavigate();

    const [question, setQuestion] = useState({});
    const [numberVotes, setNumberVotes] = useState(0);
    const [user, setUser] = useState({});

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

    const fetchNumberVotes = async () => {
        if (idAnswer) {
            let data = await getNumberVotesPost(idAnswer);
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchNumberVotes();
    }, [idAnswer])

    const fetchUser = async () => {
        if (idUser) {
            let data = await getUser(idUser);
            if (data && data.EC === 0) {
                setUser(data.DT[0]);
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, [idUser])

    return (
        <div className="answer-saved-container">
            <QuestionSaved
                idQuestion={idQuestion}
                titleQuestion={question.post_title}
                questionAskedTime={question.askedTime}
                idUser={question.created_by_user_id}
                idAcceptedAnswer={question.accepted_answer_id}
            />
            <div className="answer-saved">
                <div className="before-answer-saved"></div>
                <div className="detail-answer-saved">
                    <SummaryStatsAnswer numberVotes={numberVotes}
                        idAnswer={idAnswer}
                        idAcceptedAnswer={question.accepted_answer_id} />
                    <div className="preview-answer-saved">
                        {plainAnswer && plainAnswer.length > 170 ?
                            plainAnswer.substring(0, 170) + '...'
                            :
                            plainAnswer
                        }
                    </div>
                    <div className="meta-answer-saved">
                        <span className="view-answer-saved"
                            onClick={() => {
                                navigate(`/questions/${idQuestion}`, { state: { idTargetAnswer: idAnswer } })
                            }}>Xem câu trả lời</span>
                        <MetaAuthor
                            avatarAuthor={`${process.env.REACT_APP_URL_NODE}/images/uploads/${user.avatar_file_name}`}
                            nameUser={user.display_name}
                            questionAskedTime={questionAskedTime}
                            postType={2}
                            reputation={user.reputation} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswerSaved;