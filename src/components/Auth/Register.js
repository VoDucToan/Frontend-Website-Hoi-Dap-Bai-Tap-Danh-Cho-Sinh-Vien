import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiUserService';
import registerImage from '../../assets/images/auth/register.jpg';

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
        console.log('data', data);
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
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-4">
                                <div className="row justify-content-center">

                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example1c">Tên người dùng</label>
                                                    <input type="text" id="form3Example1c" className="form-control" onChange={(event) => {
                                                        setName(event.target.value);
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example3c">Email</label>
                                                    <input type="email" id="form3Example3c" className="form-control" onChange={(event) => {
                                                        setEmail(event.target.value);
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="form3Example4c">Mật khẩu</label>
                                                    <input type="password" id="form3Example4c" className="form-control" onChange={(event) => {
                                                        setPassword(event.target.value);
                                                    }} />
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mb-5">
                                                <p>Bạn đã có tài khoản? <Link to='/login' className='text-decoration-none'>Đăng nhập</Link></p>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
                                                    onClick={(event) => handleRegister(event)}>Đăng ký</button>
                                            </div>

                                        </form>

                                    </div>

                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src={registerImage}
                                            className="img-fluid" alt="Sample image" />
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