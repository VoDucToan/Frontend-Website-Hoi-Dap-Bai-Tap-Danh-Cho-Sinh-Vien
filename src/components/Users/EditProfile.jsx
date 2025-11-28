import { useNavigate, useOutletContext } from 'react-router-dom';
import Editor from '../../utils/Editor/Editor';
import UploadAndDisplayImage from '../../utils/UploadImage/UploadAndDisplayImage';
import './EditProfile.scss'
import { useEffect, useState } from 'react';
import { updateUser } from '../../services/apiUserService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../store/slices/authSlice';

const EditProfile = (props) => {
    const [user, fetchUser] = useOutletContext();
    const [imageUser, setImageUser] = useState([]);
    const [initialImageUser, setInitialImageUser] = useState([]);
    const [displayName, setDisplayName] = useState('');
    const [location, setLocation] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [initialAboutMe, setInitialAboutMe] = useState('');
    const [plainAboutMe, setPlainTextAboutMe] = useState("");
    const [resetPage, setResetPage] = useState(1);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleResetPage = () => {
        setResetPage(Math.random());
    }

    useEffect(() => {
        if (!_.isEmpty(user)) {
            setInitialImageUser([`http://localhost:8080/images/uploads/${user.avatar_file_name}`])
            setDisplayName(user.display_name);
            setLocation(user.location);
            setInitialAboutMe(user.about_me);
        }
    }, [user])

    const getDisplayName = (e) => {
        setDisplayName(e.target.value);
    }

    const getImage = (image) => {
        setImageUser(image);
    }

    const getLocation = (e) => {
        setLocation(e.target.value)
    }

    const getContentEditor = (content, id) => {
        setAboutMe(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextAboutMe(plainText);
    }

    const handleQuit = () => {
        navigate(`/users/${user.id}`);
    }

    const validateSaveProfile = () => {
        if (displayName.length < 3) {
            toast.error("Tên đại diện phải chứa ít nhất 3 ký tự")
            return false;
        }
        return true;
    }

    const handleSaveProfile = async () => {
        const isValidate = validateSaveProfile();
        if (!isValidate) {
            return;
        }
        const res = await updateUser(user.id, user.role_id, displayName, location, aboutMe, imageUser);
        if (res && res.EC === 0) {
            dispatch(setProfile({
                name: res.DT.display_name,
                avatar: res.DT.avatar_file_name,
            }))
            toast.success("Cập nhật thông tin cá nhân thành công");
            fetchUser();
            handleQuit();
        }
        else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="main-settings-user">
            <div className="sidebar-setttings-user">
                <h6 className='ms-2'>Thông tin cá nhân</h6>
                <div className="edit-profile">Chỉnh sửa thông tin cá nhân</div>
            </div>

            <div className="detail-settings-user">
                <div className='edit-profile-container'>
                    <h3>Chỉnh sửa thông tin cá nhân của bạn</h3>
                    <hr />
                    <span className='fs-5 mb-2 d-block'>Thông tin công khai</span>
                    <div className='public-information'>
                        <div className="mb-3">
                            <UploadAndDisplayImage
                                getImage={getImage} initialImage={initialImageUser}
                                isMultiple={false} resetPage={resetPage} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="idDisplayName" className="form-label fw-bold">Tên đại diện</label>
                            <input type="text" className="form-control" id="idDisplayName"
                                value={displayName} onChange={(e) => getDisplayName(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="idLocation" className="form-label fw-bold">Địa điểm</label>
                            <input type="text" className="form-control" id="idLocation"
                                value={location} onChange={(e) => getLocation(e)} />
                        </div>
                        <div className="mb-3">
                            <span className="fw-bold mb-2 d-block">Về tôi</span>
                            <Editor getContentEditor={getContentEditor} id={0} resetPage={resetPage}
                                getPlainTextEditor={getPlainTextEditor}
                                initialHtml={initialAboutMe} initialHeight={"210px"}
                            />
                        </div>
                    </div>
                    <div className='action-edit-profile'>
                        <button type="button" className="btn btn-primary me-3"
                            onClick={() => handleSaveProfile()}>Lưu thông tin</button>
                        <button type="button" className="btn btn-light" onClick={() => handleQuit()}>Thoát</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;