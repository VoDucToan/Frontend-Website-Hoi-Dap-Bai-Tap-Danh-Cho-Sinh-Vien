import { useNavigate } from 'react-router-dom';
import './MetaAuthor.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const MetaAuthor = (props) => {
    const { avatarAuthor, nameUser, questionAskedTime,
        postType, idAuthor, reputation
    } = props;

    const navigate = useNavigate();

    return (
        <div className="meta-author">
            {avatarAuthor && (
                <img className="img-avatar-author" src={avatarAuthor} alt="Avatar Author"
                    onClick={() => navigate(`/users/${idAuthor}`)} />
            )}
            <span className="infor-author">
                {nameUser && (
                    <span className="name-author"
                        onClick={() => navigate(`/users/${idAuthor}`)} >{nameUser} </span>
                )}
                {reputation && (
                    <OverlayTrigger
                        placement={'bottom'}
                        overlay={
                            <Tooltip>
                                <span>Điểm danh tiếng</span>
                            </Tooltip>
                        }
                    >
                        <span className='reputation-author'>{reputation} </span>

                    </OverlayTrigger>
                )}
                <span className="datetime-asked">
                    {postType === 1 ? "đã hỏi" : "đã trả lời"} {questionAskedTime}
                </span>
            </span>
        </div>
    )
}

export default MetaAuthor;