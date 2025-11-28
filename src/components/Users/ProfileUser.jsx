import { useOutletContext } from 'react-router-dom';
import './ProfileUser.scss';
import { useEffect, useState } from 'react';
import { getAmountQuestionsByUser } from '../../services/apiQuestionService';
import { toast } from 'react-toastify';
import { getAmountAnswersByUser } from '../../services/apiAnswerService';
import _ from 'lodash';

const ProfileUser = () => {
    const [user] = useOutletContext();

    const [amountQuestions, setAmountQuestions] = useState(0);
    const [amountAnswers, setAmountAnswers] = useState(0);

    const fetchAmountQuestions = async () => {
        if (!_.isEmpty(user)) {
            const res = await getAmountQuestionsByUser(user.id);
            if (res?.EC === 0) {
                setAmountQuestions(res.DT);
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    const fetchAmoutAnswers = async () => {
        if (!_.isEmpty(user)) {
            const res = await getAmountAnswersByUser(user.id);
            if (res?.EC === 0) {
                setAmountAnswers(res.DT);
            }
            else {
                toast.error(res.EM);
            }
        }
    }

    useEffect(() => {
        fetchAmountQuestions();
        fetchAmoutAnswers();
    }, [user])

    return (
        <div className="profile-user-container">
            <div className="stats-profile-user">
                <h5>Thông số</h5>
                <div className="detail-stats-profile-user">
                    <div className="reputation-detail-stats">
                        <span className='amount-reputation-points'>{user.reputation}</span>
                        <span className='text-reputation-points'>điểm danh tiếng</span>
                    </div>
                    <div className="answers-detail-stats">
                        <span className='amount-answers'>{amountAnswers}</span>
                        <span className='text-answers'>câu trả lời</span>
                    </div>
                    <div className="questions-detail-stats">
                        <span className='amount-questions'>{amountQuestions}</span>
                        <span className='text-questions'>câu hỏi</span>
                    </div>
                </div>
            </div>
            <div className="about-profile-user">
                <h5>Giới thiệu về tôi</h5>
                <div className='content-about-profile-user'
                    dangerouslySetInnerHTML={{ __html: user.about_me }}>
                </div>
            </div>
        </div>
    )
}

export default ProfileUser;