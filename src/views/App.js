import './App.scss';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar';
import { useEffect } from 'react';
import { getAccount } from '../services/apiUserService';
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from '../store/slices/authSlice';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccount = async () => {
      let data = await getAccount();
      dispatch(setAuth(data));
    }
    fetchAccount();
  }, [])
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />

      </div>
      <div className="main-container">
        <div className="sidenav-container">
          <SideBar />
        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default App;
