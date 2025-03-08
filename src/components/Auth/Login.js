import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../../services/apiUserService';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import loginImage from '../../assets/images/auth/login.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await loginUser(email, password);
        console.log('data', data);
        if (data && data.EC === 0) {
            localStorage.setItem("access_token", data.DT.access_token);
            dispatch(setAuth({
                id: data?.DT?.id ?? null,
                email: data?.DT?.email ?? "",
                name: data?.DT?.name ?? ""
            }))
            toast.success("Đăng nhập thành công!");
            navigate('/');
        }
        else {
            toast.error("Email/Password không hợp lệ")
        }
        setEmail('');
        setPassword('');
    }

    return (
        <section className="vh-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 text-black">

                        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 pt-5 pt-xl-0 mt-xl-n5 justify-content-center">

                            <form style={{ width: '23rem' }}>

                                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Đăng nhập</h3>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example18">Email</label>
                                    <input type="email" id="form2Example18" className="form-control form-control-lg"
                                        value={email} onChange={(event) => { setEmail(event.target.value) }} />
                                </div>

                                <div data-mdb-input-init className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form2Example28">Mật khẩu</label>
                                    <input type="password" id="form2Example28" className="form-control form-control-lg"
                                        value={password} onChange={(event) => { setPassword(event.target.value) }} />
                                </div>

                                <div className="pt-1 mb-4">
                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-lg btn-block" type="button"
                                        onClick={(event) => handleLogin(event)}>Đăng nhập</button>
                                </div>

                                <p className="small mb-5 pb-lg-2"><Link to='/' className='text-decoration-none text-muted'>Quên mật khẩu?</Link></p>
                                <p>Bạn chưa có tài khoản? <Link to='/register' className='text-decoration-none link-info'>Đăng ký</Link></p>

                            </form>

                        </div>

                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src={loginImage}
                            alt="Login image" className="w-100 vh-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;