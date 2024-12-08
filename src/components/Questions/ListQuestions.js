import { useEffect, useState } from "react";
import { getListQuestions } from '../../services/apiQuestionService';
import './ListQuestions.scss'
import { getNumberVotesPost } from "../../services/apiVoteService";
import { getNumberAnswers } from "../../services/apiAnswerService";
import { getListTags } from "../../services/apiTagService";
import { getNameUser } from "../../services/apiUserService";
import { Link, Outlet } from 'react-router-dom';
import ListTags from "../Tags/ListTags";
import ButtonAskQuestion from "./ButtonAskQuestion";

const ListQuestions = (props) => {
    const [listQuestions, setListQuestions] = useState([]);
    const [numberVotes, setNumberVotes] = useState([]);
    const [numberAnswers, setNumberAnswers] = useState([]);
    const [nameUser, setNameUser] = useState([]);

    useEffect(() => {
        const fetchListQuestions = async () => {
            let data = await getListQuestions();
            setListQuestions(data);
        }
        fetchListQuestions();
    }, [])

    useEffect(() => {
        const fetchNumberVotes = async () => {
            if (listQuestions && listQuestions.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNumberVotes = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getNumberVotesPost(question.id);
                        return data.DT;
                    })
                );
                setNumberVotes(arrNumberVotes);
            }

            if (listQuestions && listQuestions.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNumberAnswers = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getNumberAnswers(question.id);
                        return data.DT;
                    })
                );
                setNumberAnswers(arrNumberAnswers);
            }

            if (listQuestions && listQuestions.length > 0) {
                // Sử dụng Promise.all để đợi tất cả các API hoàn thành
                const arrNameUser = await Promise.all(
                    listQuestions.map(async (question) => {
                        let data = await getNameUser(question.created_by_user_id);
                        return data.DT[0].display_name;
                    })
                );
                setNameUser(arrNameUser);
            }
        }
        fetchNumberVotes();
    }, [listQuestions])

    return (
        <div className="list-questions-container">
            <ButtonAskQuestion />
            {listQuestions && listQuestions.length > 0 &&
                listQuestions.map((question, index) => {
                    return (
                        <div className="question" key={question.id}>
                            <div className="summary-stats">
                                <div className="stats-votes">
                                    <span>{numberVotes[index]} phiếu bầu</span>
                                </div>
                                <div className="stats-answer">
                                    <span>{numberAnswers[index]} trả lời</span>
                                </div>
                            </div>
                            <div className="summary-content">
                                <div className="summary-title-question">
                                    <Link to={`/questions/${question.id}`}>
                                        <span>{question.post_title}</span>

                                    </Link>
                                </div>
                                <div className="summary-meta">
                                    <ListTags idQuestion={question.id} />
                                    <div className="meta-author">
                                        <span>{nameUser[index]} đã hỏi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

        </div>
    )
}

export default ListQuestions;