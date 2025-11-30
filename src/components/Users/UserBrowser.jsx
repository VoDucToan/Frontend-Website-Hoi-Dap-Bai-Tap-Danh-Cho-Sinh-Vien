import './UserBrowser.scss';
import { useNavigate } from 'react-router-dom';

const UserBrowser = (props) => {
    const { user } = props;

    const navigate = useNavigate();

    const handleRedirectUser = () => {
        navigate(`/users/${user.id}`);
    }

    return (
        <div className='user-browser-container'>
            <img src={`${process.env.REACT_APP_URL_NODE}/images/uploads/${user.avatar_file_name}`}
                className='avatar-user' onClick={() => handleRedirectUser()} />
            <div className='user-info'>
                <span className='user-info-name'
                    onClick={() => handleRedirectUser()}>
                    {user.display_name}
                </span>
            </div>
        </div>
    )
}

export default UserBrowser;