import Header from '../components/Header/Header';
import { createBrowserRouter, Outlet, RouterProvider, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { getAccount, refreshAccessToken } from '../services/apiUserService';
import { useSelector, useDispatch } from 'react-redux'
import { resetAuth, setAuth } from '../store/slices/authSlice';
import { setLoading } from '../store/slices/loadingSlice';
import Loading from '../utils/Loading/Loading';
import LayoutUser from './LayoutUser';
import ListQuestions from '../components/Questions/ListQuestions';
import ActivityUser from '../components/Users/ActivityUser';
import Question from '../components/Questions/Question';
import RequireAuth from '../components/Auth/RequireAuth';
import AskQuestion from '../components/Questions/AskQuestion';
import EditQuestion from '../components/Questions/EditQuestion';
import LayoutAdmin from './LayoutAdmin';
import DashBoard from '../components/Admin/DashBoard';
import ManageQuestions from '../components/Admin/Questions/ManageQuestions';
import ManageUsers from '../components/Admin/User/ManageUsers';
import ManageEdits from '../components/Admin/EditsPost/ManageEdits';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import VerifyEmail from '../components/Auth/VerifyEmail';
import EditPost from '../components/Post/EditPost';
import EditProfile from '../components/Users/EditProfile';
import Users from '../components/Users/Users';
import ListUsers from '../components/Users/ListUsers';
import Tags from '../components/Tags/Tags';
import CreateTag from '../components/Tags/CreateTag';
import ManageTags from '../components/Admin/Tags/ManageTags';
import TagInfo from '../components/Tags/TagInfo';
import EditTag from '../components/Tags/EditTag';
import ManageEditsTag from '../components/Admin/EditsTag/ManageEditsTag';
import Saves from '../components/Saves/Saves';
import ListSavedItems from '../components/Saves/ListSavedItems';
import Search from '../components/Search/Search';
import Inboxes from '../components/Inboxes/Inboxes';
import ProfileUser from '../components/Users/ProfileUser';
import QuestionsUser from '../components/Questions/QuestionsUser';
import AnswersUser from '../components/Answer/AnswersUser';
import FollowUser from '../components/Follow/FollowUser';
import VotesUser from '../components/Votes/VotesUser';
import NotFound from '../utils/NotFound/NotFound';
import OwnerGuard from '../components/Auth/OwnerGuard';
import AdminGuard from '../components/Auth/AdminGuard';
import ManageAnswers from '../components/Admin/Answers/ManageAnswers';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const status = useSelector(state => state.auth.status);
  const expiresAt = useSelector(state => state.auth.expiresAt);
  const dispatch = useDispatch();

  const handleRefreshAccessToken = useCallback(async () => {
    const res = await refreshAccessToken();
    if (res && res.EC === 0) {
      dispatch(setAuth({
        user: {
          id: res?.DT?.id ?? null,
          email: res?.DT?.email ?? "",
          name: res?.DT?.name ?? "",
          avatar: res?.DT?.avatar ?? "",
          reputation: res?.DT?.reputation ?? 1,
          role: res?.DT?.role ?? 1,
        },
        accessToken: res?.DT?.access_token ?? "",
        expiresAt: res?.DT?.expiresAt ?? null,
      }))
    }
    else {
      dispatch(resetAuth());
    }
  }, [setAuth, resetAuth])

  useEffect(() => {
    handleRefreshAccessToken();
  }, [handleRefreshAccessToken]);

  useEffect(() => {
    let refreshAccessTokenTimerId;
    if (isAuthenticated) {
      refreshAccessTokenTimerId = setTimeout(() => {
        handleRefreshAccessToken();
      }, new Date(expiresAt).getTime() - Date.now() - 10 * 1000)
    }

    return (() => {
      if (isAuthenticated && refreshAccessTokenTimerId) {
        clearTimeout(refreshAccessTokenTimerId);
      }
    })
  }, [isAuthenticated, expiresAt, handleRefreshAccessToken])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutUser />,
      children: [
        { index: true, element: <ListQuestions /> },
        {
          path: "users",
          element: <Users />,
          children: [
            {
              path: ":iduser",
              element: <ProfileUser />,
            },
            {
              path: "activity/:iduser",
              element: <ActivityUser />,
              children: [
                { index: true, element: <QuestionsUser /> },
                {
                  path: "questions",
                  element: <QuestionsUser />,
                },
                {
                  path: "answers",
                  element: <AnswersUser />,
                },
                {
                  path: "following",
                  element: <OwnerGuard><FollowUser /></OwnerGuard>,
                },
                {
                  path: "votes",
                  element: <OwnerGuard><VotesUser /></OwnerGuard>,
                },
              ],
            },
            {
              path: "edit/:iduser",
              element: <OwnerGuard><EditProfile /></OwnerGuard>,
            },
            {
              path: "saves/:iduser",
              element: <OwnerGuard><Saves /></OwnerGuard>,
              children: [
                { index: true, element: <ListSavedItems /> },
                {
                  path: ":idlist",
                  element: <ListSavedItems />,
                },
              ]
            },
            {
              path: "inboxes/:iduser",
              element: <OwnerGuard><Inboxes /></OwnerGuard>,
            },
          ]
        },
        {
          path: "tags",
          element: <Tags />,
        },
        {
          path: "tags/create",
          element: <RequireAuth><CreateTag /></RequireAuth>,
        },
        {
          path: "tags/:idtag/info",
          element: <TagInfo />,
        },
        {
          path: "edit-tag-wiki/:idtag",
          element: <RequireAuth><EditTag /></RequireAuth>,
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
          element: <RequireAuth><AskQuestion /></RequireAuth>,
        },
        {
          path: "posts/:idpost/edit",
          element: <RequireAuth><EditPost /></RequireAuth>,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
    {
      path: "/admin",
      element: <RequireAuth><AdminGuard><LayoutAdmin /></AdminGuard></RequireAuth>,
      children: [
        // { index: true, element: <DashBoard /> },
        { index: true, element: <ManageQuestions /> },
        {
          path: "questions",
          element: <ManageQuestions />,
        },
        {
          path: "answers",
          element: <ManageAnswers />,
        },
        {
          path: "users",
          element: <ManageUsers />,
        },
        {
          path: "edits-post",
          element: <ManageEdits />,
        },
        {
          path: "edits-tag",
          element: <ManageEditsTag />,
        },
        {
          path: "tags",
          element: <ManageTags />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify-email/:token",
      element: <VerifyEmail />,
    },
    {
      path: "*", element: <NotFound />
    },
  ]);

  if (status === "pending") return <Loading />;

  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
