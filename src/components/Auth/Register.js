import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiUserService';
import registerImage from '../../assets/images/auth/register.jpg';
import logoUTE from '../../assets/images/auth/login.jpg';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        //validate email
        if (!validateEmail(email)) {
            toast.info("Email nhập chưa chính xác");
            return;
        }
        //validate password
        if (!password) {
            toast.info("Mật khẩu chưa nhập");
            return;
        }
        //validate name
        if (!name) {
            toast.info("Tên người dùng chưa nhập");
            return;
        }
        const data = await createUser(email, password, name);
        if (data.EC === 0) {
            toast.success("Đăng ký thành công!")
            navigate('/');
        }
        else if (data.EC === 1) {
            toast.error("Email đăng ký đã tồn tại!")
        }
        setEmail('');
        setName('');
        setPassword('');
    }

    return (
        // <!-- Registration 7 - Bootstrap Brain Component -->
        <section className="bg-light vh-100 p-3 p-md-4 p-xl-5">
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
                                            <h2 className="h2 text-center">Đăng ký</h2>
                                        </div>
                                    </div>
                                </div>
                                <form action="#!">
                                    <div className="row gy-3 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" name="lastName" id="lastName" placeholder="First Name" required
                                                    value={name} onChange={(event) => { setName(event.target.value); }} />
                                                <label htmlFor="lastName" className="form-label">Tên người dùng</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" name="email" id="email" placeholder="name@example.com" required
                                                    value={email} onChange={(event) => { setEmail(event.target.value); }} />
                                                <label htmlFor="email" className="form-label">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="password" className="form-control" name="password" id="password" placeholder="Password" required
                                                    value={password} onChange={(event) => { setPassword(event.target.value); }} />
                                                <label htmlFor="password" className="form-label">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" name="iAgree" id="iAgree" required />
                                                <label className="form-check-label text-secondary" htmlFor="iAgree">
                                                    I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn bsb-btn-xl btn-primary btn-lg" type="submit" onClick={(event) => handleRegister(event)}>Đăng ký</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="my-3 border-secondary-subtle" />
                                        <p className="m-0 text-secondary text-center">Bạn đã có tài khoản? <Link to='/login' className='link-primary text-decoration-none'>Đăng nhập</Link></p>
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

export default Register;