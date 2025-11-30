import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { resetAuth } from '../../store/slices/authSlice';
import { logout } from '../../services/apiUserService';
import './Header.scss';
import { IoIosSearch } from "react-icons/io";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Notification from './Notification';
import { useState } from 'react';

const Header = () => {
    const [textSearch, setTextSearch] = useState('');
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const res = await logout();
        if (res && res.EC === 0) {
            dispatch(resetAuth());
        }
    }

    const getTextSearch = (e) => {
        setTextSearch(e.target.value)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?textSearch=${textSearch}`);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link to='/' className='navbar-brand logo-web'>Hỏi Đáp UTE</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='justify-content-end navbar-collapse'>
                    <Form className="d-flex header-search"
                        onSubmit={(e) => handleSearch(e)}>
                        <span className='icon-search'>
                            <IoIosSearch />
                        </span>
                        <input type="text" className="form-control input-search" placeholder="Tìm kiếm..."
                            value={textSearch} onChange={(e) => getTextSearch(e)}
                        />
                    </Form>
                    <Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        {
                            auth.isAuthenticated ?
                                <>
                                    <Link to={`/users/${auth.user.id}`} className='text-decoration-none'>
                                        <div className='avatar-author-container'>
                                            <OverlayTrigger
                                                placement={'bottom'}
                                                overlay={
                                                    <Tooltip>
                                                        {auth.user.name}
                                                    </Tooltip>
                                                }
                                            >
                                                <img className="img-avatar-author"
                                                    src={`${process.env.REACT_APP_URL_NODE}/images/uploads/${auth.user.avatar}`}
                                                    alt="Avatar Author" />
                                            </OverlayTrigger>
                                            <OverlayTrigger
                                                placement={'bottom'}
                                                overlay={
                                                    <Tooltip>
                                                        <span>Điểm danh tiếng</span>
                                                    </Tooltip>
                                                }
                                            >
                                                <span className='reputation-author'>{auth.user.reputation}</span>
                                            </OverlayTrigger>
                                        </div>
                                    </Link>
                                    <Notification />
                                    <Link to='/' className='my-auto ms-5'>
                                        <button className='btn btn-primary btn-sm' onClick={() => handleLogout()}>
                                            Đăng xuất
                                        </button>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to='/login' className='my-auto me-1'>
                                        <button className='btn btn-outline-info btn-sm '>
                                            Đăng nhập
                                        </button>
                                    </Link>
                                    <Link to='/register' className='my-auto'>
                                        <button className='btn btn-primary btn-sm'>
                                            Đăng ký
                                        </button>
                                    </Link>
                                </>
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default Header;