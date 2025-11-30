import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { updateUser } from '../../../services/apiUserService';
import Editor from '../../../utils/Editor/Editor';
import UploadAndDisplayImage from '../../../utils/UploadImage/UploadAndDisplayImage';

function ModalUpdateUser(props) {
    const { id, username, email, role, isverifyemail, createdate, updatedate,
        location, aboutme, resetPage, image, fetchListUsers } = props;

    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState("");
    const [roleUser, setRoleUser] = useState(1);
    const [locationUser, setLocationUser] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [plainTextAboutMe, setPlainTextAboutMe] = useState("");
    const [initialAboutMe, setInitialAboutMe] = useState("");
    const [imageUser, setImageUser] = useState([]);
    const [initialImageUser, setInitialImageUser] = useState([]);

    useEffect(() => {
        setUserName(username);
        setRoleUser(role);
        setLocationUser(location);
        setInitialAboutMe(aboutme);
        setInitialImageUser([`${process.env.REACT_APP_URL_NODE}/images/uploads/${image}`])
    }, [show, username, role, location, aboutme])

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const getRoleUser = (e) => {
        setRoleUser(e.target.value);
    }

    const getUserName = (e) => {
        setUserName(e.target.value);
    }

    const getLocationUser = (e) => {
        setLocationUser(e.target.value);
    }

    const getContentEditor = (content, id) => {
        setAboutMe(content);
    }

    const getPlainTextEditor = (plainText, id) => {
        setPlainTextAboutMe(plainText);
    }

    const getImage = (image) => {
        setImageUser(image);
    }

    const validateUpdateUser = () => {
        if (userName.length < 3) {
            toast.error("Tên đại diện phải chứa ít nhất 3 ký tự")
            return false;
        }
        return true;
    }

    const handleSaveChanges = async () => {
        const isValidate = validateUpdateUser();
        if (!isValidate) {
            return;
        }

        const data = await updateUser(id, roleUser, userName, locationUser, aboutMe, imageUser);
        if (data && data.EC === 0) {
            toast.success("Cập nhật người dùng thành công");
            fetchListUsers();
            handleClose();
        }
        else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <button className="btn btn-warning me-2" onClick={handleShow}>Update</button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-update-user-container px-4">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="inputID" class="form-label">ID</label>
                                <input type="text" class="form-control" id="inputID" value={id} disabled />
                            </div>
                            <div class="col-md-3">
                                <label for="inputRole" class="form-label">Role</label>
                                <select id="inputRole" class="form-select" value={roleUser} onChange={(e) => { getRoleUser(e) }}>
                                    <option value={1}>User</option>
                                    <option value={2}>Admin</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label for="inputVerifyEmail" class="form-label">Verify Email</label>
                                <select id="inputVerifyEmail" class="form-select" value={isverifyemail} disabled >
                                    <option value={false}>False</option>
                                    <option value={true}>True</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail4" value={email} disabled />
                            </div>
                            <div class="col-md-6">
                                <label for="inputUsername" class="form-label">Username</label>
                                <input type="text" class="form-control" id="inputUsername" value={userName}
                                    onChange={(e) => { getUserName(e) }} />
                            </div>
                            <div class="col-md-12">
                                <label for="inputLocation" class="form-label">Location</label>
                                <input type="text" class="form-control" id="inputLocation" value={locationUser}
                                    onChange={(e) => { getLocationUser(e) }} />
                            </div>
                            <div class="col-12">
                                <label class="form-label">About Me</label>
                                <Editor getContentEditor={getContentEditor} id={0} getPlainTextEditor={getPlainTextEditor}
                                    initialHtml={initialAboutMe} initialHeight={"210px"} />
                            </div>
                            <div className="mb-3">
                                <UploadAndDisplayImage
                                    getImage={getImage} initialImage={initialImageUser}
                                    isMultiple={false} />
                            </div>
                            <div class="col-md-6">
                                <label for="inputCreatedDate" class="form-label">Created Date</label>
                                <input type="text" class="form-control" id="inputCreatedDate" value={createdate} disabled />
                            </div>
                            <div class="col-md-6">
                                <label for="inputUpdatedDate" class="form-label">Updated Date</label>
                                <input type="text" class="form-control" id="inputUpdatedDate" value={updatedate} disabled />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveChanges()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;