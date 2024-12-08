import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import User from './components/Users/User';
import Admin from './components/Admin/Admin';
import ListQuestions from './components/Questions/ListQuestions';
import Register from './components/Auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import { AuthWrapper } from './components/Context/authContext';
import Question from './components/Questions/Question';
import AskQuestion from './components/Questions/AskQuestion';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ListQuestions /> },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "questions",
        element: <ListQuestions />,
      },
      {
        path: "questions/:idpost",
        element: <Question />,
      },
      {
        path: "questions/ask",
        element: <AskQuestion />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>

    <ToastContainer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
