import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { resetAuth } from '../../store/slices/authSlice';

const Header = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear("access_token");
        dispatch(resetAuth());
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link to='/' className='navbar-brand ms-5'>Hỏi Đáp UTE</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                    <Form className="d-flex w-50 me-5">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        {
                            auth.isAuthenticated ?
                                <>
                                    <Link to='/user' className='nav-link'>User</Link>
                                    <NavDropdown title="Thông báo" id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Link to='/' className='my-auto'>
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
        </Navbar>
    );
}

export default Header;