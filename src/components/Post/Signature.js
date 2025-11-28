import { Link } from 'react-router-dom';
import Author from '../Users/Author';
import './Signature.scss';
import Follow from './Follow';
import { useSelector } from 'react-redux';

const Signature = (props) => {
    const { idAuthorEdited, idAuthorAsked, askedTime, editedTime, idPost, previousEditId,
        postType
    } = props;

    const idUser = useSelector(state => state.auth.user.id);

    return (
        <div className="signature-post">
            <div className="option-post">
                {/* <span className="share-option-post">Chia sẻ</span> */}
                <Link to={`/posts/${idPost}/edit`} className='text-decoration-none'>
                    <span className="edit-option-post">Chỉnh sửa</span>
                </Link>
                {idUser !== idAuthorAsked && (
                    <Follow idPost={idPost} postType={postType} idAuthor={idAuthorAsked} />
                )}
            </div>
            {previousEditId && (
                <Author idAuthor={idAuthorEdited} editedTime={editedTime} typeAction={2}
                    show={idAuthorEdited !== idAuthorAsked} />
            )}
            <Author idAuthor={idAuthorAsked} askedTime={askedTime} typeAction={1} postType={postType} />
        </div>
    )
}

export default Signature;