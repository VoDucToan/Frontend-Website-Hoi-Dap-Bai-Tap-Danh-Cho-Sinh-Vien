import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../../services/apiUserService';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.scss';
import logoUTE from '../../assets/images/auth/login.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../store/slices/authSlice';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = await loginUser(email, password);
        if (data && data.EC === 0) {
            dispatch(setAuth({
                user: {
                    id: data?.DT?.id ?? null,
                    email: data?.DT?.email ?? "",
                    name: data?.DT?.name ?? "",
                    avatar: data?.DT?.avatar ?? "",
                    reputation: data?.DT?.reputation ?? 1,
                    role: data?.DT?.role ?? 1,
                },
                accessToken: data?.DT?.access_token ?? "",
                expiresAt: data?.DT?.expiresAt ?? null,
            }))
            toast.success("Đăng nhập thành công!");
            navigate(state?.path || "/");
        }
        else {
            toast.error("Email/Password không hợp lệ")
        }
        setEmail('');
        setPassword('');
    }

    return (
        <section className="bg-primary vh-100 p-3 p-md-4 p-xl-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
                        <div className="card border border-light-subtle rounded-4">
                            <div className="card-body p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <div className="text-center mb-2">
                                                <a href="#!">
                                                    <img src={logoUTE} alt="BootstrapBrain Logo" width="100" />
                                                </a>
                                            </div>
                                            <h2 className="h2 text-center">Đăng nhập</h2>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div className="row gy-3 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required
                                                    value={email} onChange={(event) => { setEmail(event.target.value) }} />
                                                <label htmlFor="email" className="form-label">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" required
                                                    value={password} onChange={(event) => { setPassword(event.target.value) }} />
                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                                                <label className="form-check-label text-secondary" htmlFor="remember_me">
                                                    Remember password
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary btn-lg" type="submit" onClick={(event) => handleLogin(event)}>Đăng nhập</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="my-3 border-secondary-subtle" />
                                        <p className="m-0 pb-lg-2 text-secondary"><Link to='/' className='text-decoration-none text-muted'>Quên mật khẩu?</Link></p>
                                        <p className='m-0 text-secondary text-center'>Bạn chưa có tài khoản? <Link to='/register' className='text-decoration-none link-primary'>Đăng ký</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;