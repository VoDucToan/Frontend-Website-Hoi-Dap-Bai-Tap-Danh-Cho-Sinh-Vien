import './ProposedAuthor.scss';

const ProposedAuthor = (props) => {
    const { avatarAuthor, nameUser, proposedTime } = props;

    return (
        <div className="proposed-author">
            <span className="datetime-asked">Đã đề xuất {proposedTime}</span>
            <img className="img-avatar-author" src={avatarAuthor} alt="Avatar Author" />
            <span className="infor-author">
                <span className="name-author">{nameUser}</span>
            </span>
        </div>
    )
}

export default ProposedAuthor;