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

        // <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        //     <div className="container h-100">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //             <div className="col-lg-12 col-xl-11">
        //                 <div className="card text-black" style={{ borderRadius: "25px" }}>
        //                     <div className="card-body p-md-4">
        //                         <div className="row justify-content-center">

        //                             <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

        //                                 <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng ký</p>

        //                                 <form className="mx-1 mx-md-4">

        //                                     <div className="d-flex flex-row align-items-center mb-4">
        //                                         <i className="fas fa-user fa-lg me-3 fa-fw"></i>
        //                                         <div data-mdb-input-init className="form-outline flex-fill mb-0">
        //                                             <label className="form-label" htmlFor="form3Example1c">Tên người dùng</label>
        //                                             <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(event) => {
        //                                                 setName(event.target.value);
        //                                             }} />
        //                                         </div>
        //                                     </div>

        //                                     <div className="d-flex flex-row align-items-center mb-4">
        //                                         <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
        //                                         <div data-mdb-input-init className="form-outline flex-fill mb-0">
        //                                             <label className="form-label" htmlFor="form3Example3c">Email</label>
        //                                             <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(event) => {
        //                                                 setEmail(event.target.value);
        //                                             }} />
        //                                         </div>
        //                                     </div>

        //                                     <div className="d-flex flex-row align-items-center mb-4">
        //                                         <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
        //                                         <div data-mdb-input-init className="form-outline flex-fill mb-0">
        //                                             <label className="form-label" htmlFor="form3Example4c">Mật khẩu</label>
        //                                             <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(event) => {
        //                                                 setPassword(event.target.value);
        //                                             }} />
        //                                         </div>
        //                                     </div>

        //                                     <div className="d-flex justify-content-center mb-5">
        //                                         <p>Bạn đã có tài khoản? <Link to='/login' className='text-decoration-none'>Đăng nhập</Link></p>
        //                                     </div>

        //                                     <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
        //                                         <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
        //                                             onClick={(event) => handleRegister(event)}>Đăng ký</button>
        //                                     </div>

        //                                 </form>

        //                             </div>

        //                             <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
        //                                 <img src={registerImage}
        //                                     className="img-fluid" alt="Sample image" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>


        // <!-- Registration 7 - Bootstrap Brain Component -->
        <section className="bg-light p-3 p-md-4 p-xl-5">
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
                                <div className="row">
                                    <div className="col-12">
                                        <p className="my-3">Hoặc tiếp tục với</p>
                                        <div className="d-flex gap-2 gap-sm-3 justify-content-center">
                                            <a href="#!" className="btn btn-lg btn-outline-danger p-3 lh-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                                </svg>
                                            </a>
                                            <a href="#!" className="btn btn-lg btn-outline-primary p-3 lh-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                            </a>
                                            <a href="#!" className="btn btn-lg btn-outline-info p-3 lh-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                                </svg>
                                            </a>
                                            <a href="#!" className="btn btn-lg btn-outline-dark p-3 lh-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-apple" viewBox="0 0 16 16">
                                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                </svg>
                                            </a>
                                        </div>
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