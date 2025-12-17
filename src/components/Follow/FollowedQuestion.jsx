import { useEffect, useState } from "react";
import { getNumberAnswers } from "../../services/apiAnswerService";
import { getListTagsByQuestion } from "../../services/apiTagService";
import { getNumberVotesPost } from "../../services/apiVoteService";
import SummaryMetaQuestion from "../Questions/SummaryMetaQuestion";
import SummaryStatsQuestion from "../Questions/SummaryStatsQuestion";
import { getUser } from "../../services/apiUserService";

const FollowedQuestion = (props) => {
    const { idQuestion, titleQuestion, idUser, questionAskedTime,
        previewContent, postType, idAcceptedAnswer
    } = props;

    const [listTagsByQuestion, setListTagsByQuestion] = useState([]);
    const [numberVotes, setNumberVotes] = useState(0);
    const [numberAnswers, setNumberAnswers] = useState(0);
    const [user, setUser] = useState({});

    const fetchListTagsByQuestion = async () => {
        if (idQuestion) {
            const data = await getListTagsByQuestion(idQuestion);
            setListTagsByQuestion(data.DT);
        }
    }

    const fetchNumberAnswers = async () => {
        if (idQuestion) {
            let data = await getNumberAnswers(idQuestion);
            setNumberAnswers(data.DT);
        }

    }

    const fetchNumberVotes = async () => {
        if (idQuestion) {
            let data = await getNumberVotesPost(idQuestion);
            setNumberVotes(data.DT);
        }
    }

    useEffect(() => {
        fetchListTagsByQuestion();
        fetchNumberAnswers();
        fetchNumberVotes();
    }, [idQuestion])

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
        <div className="followed-question-container">
            <SummaryStatsQuestion
                amountVotes={numberVotes}
                amountAnswers={numberAnswers}
                idAcceptedAnswer={idAcceptedAnswer}
            />
            <SummaryMetaQuestion
                idQuestion={idQuestion}
                titleQuestion={titleQuestion}
                listTags={listTagsByQuestion}
                avatarAuthor={user.avatar_file_name}
                nameUser={user.display_name}
                questionAskedTime={questionAskedTime}
                previewContent={previewContent}
                postType={postType}
                idAuthor={idUser}
                reputation={user.reputation}
            />
        </div>
    )
}

export default FollowedQuestion;