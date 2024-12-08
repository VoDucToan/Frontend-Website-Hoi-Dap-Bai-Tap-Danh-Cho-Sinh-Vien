import './App.scss';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar';
import { useContext, useEffect } from 'react';
import { getAccount } from '../services/apiUserService';
import { AuthContext } from '../components/Context/authContext';

const App = () => {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      let data = await getAccount();
      setAuth({
        isAuthenticated: true,
        user: data
      });
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
