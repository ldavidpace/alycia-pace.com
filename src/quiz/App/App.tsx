import * as React from 'react';
import {
  createBrowserRouter, Outlet, RouterProvider,
} from 'react-router-dom';
import {
  AppContextProvider, updateContext,
} from 'Utilities/AppContext';
import Quiz from '~Quiz';

import Header from '../Header';
import Quizzes from '../Quizzes';
import Review from '../Review';
import CreateAccount from '../Routes/CreateAccount';
import Login from '../Routes/Login';
import {
  getSessionInfo,
} from '../service/sessionUtils';
import SubHeader from '../SubHeader';
import * as styles from './App.module.css';


type AppProps = {};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className={styles.App}>
        <Header />
        <SubHeader />
        <Outlet />
      </div>
    ),
    children: [
      {
        
        path: "",
        element: <Quizzes />
      },
      {
        path: "/quiz/:id",
        element: <Quiz />
      },
      {
        id: "review",
        path: "/review",
        element: <Review />
      },
      {
        id: "login",
        path: "/login",
        element: (
          <Login />
        )
      },
      {
        id: "createAccount",
        path: "/createAccount",
        element: <CreateAccount />
      },
      {
        id: "home",
        path: "/:view?",
        element: <div>Quizzes</div>
      },
    ],
  },
]);

const App = ({}: AppProps) => {
  React.useEffect(() => {
    getSessionInfo().then(( user )=>{
      updateContext((state) => {
        state.user = user;
      })
    });
  }, []);
  

  return <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>;
}

export default App;
