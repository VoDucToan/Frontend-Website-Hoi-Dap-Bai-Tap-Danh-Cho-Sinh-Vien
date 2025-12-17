import { useEffect, useState } from 'react';
import './Author.scss';
import { getUser } from '../../services/apiUserService';
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Author = (props) => {
    const { idAuthor, askedTime, editedTime, typeAction, show, postType } = props;
    const [author, setAuthor] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthor = async () => {
            if (idAuthor) {
                const data = await getUser(idAuthor);
                setAuthor(data.DT[0]);
            }
        }
        fetchAuthor();
    }, [idAuthor])

    return (
        <div className="user-action-question" style={typeAction === 1 ? { backgroundColor: '#d9fbff' } : { backgroundColor: '#ffffff' }}>
            {typeAction === 1 ?
                (<span className="datetime-user-asked">{postType === 1 ? "đã hỏi" : "đã trả lời"} {askedTime}</span>)
                :
                (<span className="datetime-user-edited">đã chỉnh sửa {editedTime}</span>)
            }
            {(show === true || show === undefined) && (
                <div className="information-author">
                    <div className="avatar-author">
                        <img className="img-avatar-author"
                            src={author.avatar_file_name}
                            alt="Avatar Author" onClick={() => navigate(`/users/${idAuthor}`)} />
                    </div>
                    <div className="detail-author">
                        <span className="name-detail-author"
                            onClick={() => navigate(`/users/${idAuthor}`)}>
                            {author.display_name}
                        </span>
                        <OverlayTrigger
                            placement={'bottom'}
                            overlay={
                                <Tooltip>
                                    <span>Điểm danh tiếng</span>
                                </Tooltip>
                            }
                        >
                            <span className='reputation-detail-author'>
                                {author.reputation}
                            </span>
                        </OverlayTrigger>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Author;