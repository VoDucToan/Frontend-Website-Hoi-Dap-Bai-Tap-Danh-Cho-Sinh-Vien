import { useEffect, useState } from "react";
import ListComments from "../Comments/ListComments";
import VotePost from "../Votes/VotePost";
import './ListAnswers.scss';
import { getListAnswers, getNumberAnswers, handleCreateAnswer } from "../../services/apiAnswerService";
import Editor from "../../utils/Editor/Editor";
import { getAccount } from "../../services/apiUserService";
import { toast } from "react-toastify";

const ListAnswers = (props) => {
    const { idQuestion } = props;
    const [listAnswers, setListAnswers] = useState([]);
    const [numberAnswers, setNumberAnswers] = useState(0);
    const [contentAnswer, setContentAnswer] = useState("");

    const getContentEditor = (content, id) => {
        setContentAnswer(content);
    }

    const createAnswer = async () => {
        const account = await getAccount();
        const data = await handleCreateAnswer(account.id, idQuestion, contentAnswer);
        if (data && data.EC === 0) {
            const data = await getListAnswers(idQuestion);
            setListAnswers(data);
            toast.success('Gửi câu trả lời thành công');
        }
        else {
            toast.error('Gửi câu trả lời thất bại');
        }
    }

    useEffect(() => {
        const fetchListAnswers = async () => {
            const data = await getListAnswers(idQuestion);
            setListAnswers(data);
        }
        fetchListAnswers();
    }, [])

    useEffect(() => {
        const fetchNumberAnswers = async () => {
            const data = await getNumberAnswers(idQuestion);
            setNumberAnswers(data.DT);
        }
        fetchNumberAnswers();
        listAnswers && listAnswers.length > 0 && listAnswers.map((answer) => {
            const idElement = answer.id + "-content-answer";
            document.getElementById(idElement).innerHTML = answer.post_details;
        })

    }, [listAnswers])

    return (
        <div className="list-answers-container">
            <div className="number-answers">
                {numberAnswers} Trả lời
            </div>
            {listAnswers && listAnswers.length > 0 && listAnswers.map((answer) => {
                return (
                    <div className="answer-container" key={answer.id}>
                        <div >
                            <VotePost idpost={answer.id} />
                        </div>
                        <div className="detail-answer">
                            <div className="content-answer" id={answer.id + "-content-answer"}></div>
                            <div className="signature-answer">
                                <div className="option-answer">
                                    <span>Chia sẻ</span>
                                    <span>Chỉnh sửa</span>
                                    <span>Theo dõi</span>
                                </div>
                                <div className="user-edited-answer">
                                    Đã chỉnh sửa vào ngày
                                </div>
                                <div className="user-asked-answer">
                                    Đã hỏi vào ngày
                                </div>
                            </div>
                            <ListComments idPost={answer.id} />
                        </div>
                    </div>
                )
            })}
            <div className="post-answer-container">
                <h5>Câu trả lời của bạn</h5>
                <Editor getContentEditor={getContentEditor} id={0} />
                <button className="btn btn-primary" onClick={() => createAnswer()}>Gửi câu trả lời của bạn</button>
            </div>
        </div>
    )
}

export default ListAnswers;