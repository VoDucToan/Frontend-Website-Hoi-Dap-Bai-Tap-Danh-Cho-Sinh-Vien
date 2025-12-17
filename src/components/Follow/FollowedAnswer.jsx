import { useEffect, useState } from "react";
import SummaryStatsAnswer from "../Answer/SummaryStatsAnswer";
import SummaryMetaQuestion from "../Questions/SummaryMetaQuestion";
import { getNumberVotesPost } from "../../services/apiVoteService";
import { getQuestions } from "../../services/apiQuestionService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import { getUser } from "../../services/apiUserService";

const FollowedAnswer = (props) => {
    const { idAnswer, idQuestion, idUser, questionAskedTime,
        previewContent, postType
    } = props;

    const [numberVotes, setNumberVotes] = useState(0);
    const [question, setQuestion] = useState({});
    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);
    const [user, setUser] = useState({});

    const fetchQuestion = async () => {
        if (idQuestion) {
            const res = await getQuestions(idQuestion);
            if (res && res.EC === 0) {
                setQuestion(res.DT);
            }
        }
    }

    const fetchListTagsByQuestion = async () => {
        if (idQuestion) {
            const data = await getListTagsByQuestion(idQuestion);
            setListTagsByQuestion(data.DT);
        }
    }

    useEffect(() => {
        fetchQuestion();
        fetchListTagsByQuestion();
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
        <div className="followed-answer-container">
            <SummaryStatsAnswer
                numberVotes={numberVotes}
                idAnswer={idAnswer}
                idAcceptedAnswer={question.accepted_answer_id} />
            <SummaryMetaQuestion
                idQuestion={idQuestion}
                titleQuestion={question.post_title}
                listTags={listTagsByQuestion}
                avatarAuthor={user.avatar_file_name}
                nameUser={user.display_name}
                questionAskedTime={questionAskedTime}
                previewContent={previewContent}
                postType={postType}
                idAnswer={idAnswer}
                idAuthor={idUser}
                reputation={user.reputation}
            />
        </div>
    )
}

export default FollowedAnswer;