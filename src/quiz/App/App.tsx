import * as React from "react";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {
  getSessionInfo
} from '../service/sessionUtils';

import AppContext from "../Utilities/AppContext";

import * as styles from "./App.module.css"
import Header from "../Header";
import CreateAccount from "../Routes/CreateAccount";
import Login from "../Routes/Login";
import { SessionInfo } from "../Utilities/AppContext/userTypes";
import SubHeader from "../SubHeader";
import Quizzes from "../Quizzes";
import Review from "../Review";

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
  const [context, setContext] = React.useState<SessionInfo>();
  React.useEffect(() => {
    getSessionInfo().then(( user )=>{
      setContext(user);
    });
  }, []);
  
  const contextValue = React.useMemo(() => ({
    user: context?.user,
  }) ,[context])

  return <AppContext.Provider value={contextValue}>
    <RouterProvider router={router} />
  </AppContext.Provider>;
}

export default App;
