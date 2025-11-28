import './LayoutUser.scss';
import Header from '../components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import UserSideBar from '../components/SideBar/UserSideBar';
import { FaRegAddressCard } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const LayoutUser = () => {
    return (
        <div className="user-container">
            <div className="header-container">
                <Header />
            </div>
            <div className="main-user-container">
                <div className="sidenav-user-container">
                    <UserSideBar />
                </div>
                <div className="app-content">
                    <Outlet />
                </div>
            </div>
            <div className='footer-container'>
                <div className='content-footer'>
                    <div className='company-footer'>
                        <p className='name-company'>Hỏi Đáp UTE</p>
                        <span className='purpose-company'>Website hỏi đáp bài tập dành cho sinh viên
                            Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh.</span>
                    </div>
                    <div className='business-footer'>
                        <p className='term-business'>Điều khoản</p>
                        <Link to='/' className='navbar-brand'><span className='help-business'>Hưỡng dẫn</span></Link>
                        <Link to='/' className='navbar-brand'><span className='rule-business'>Nội quy</span></Link>
                        <Link to='/' className='navbar-brand'><span className='contribute-business'>Góp ý</span></Link>
                    </div>
                    <div className='contact-footer'>
                        <p className='text-contact'>Liên hệ</p>
                        <span className='address-contact'> <FaRegAddressCard /> 01 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh</span>
                        <span className='mail-contact'><IoMdMail /> 21110689@student.hcmute.edu.vn</span>
                        <span className='phone-number-contact'> <FaPhoneAlt /> +84123456789</span>
                    </div>
                </div>
                <div className='copyright-footer'>
                    <span className='text-copyright'>© 2025 Copyright: Võ Đức Toàn - 21110689</span>
                </div>
            </div>
        </div>
    );
}

export default LayoutUser;
