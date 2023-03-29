import * as React from "react";
import {
  Outlet,
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";

import {
  getSessionInfo
} from './service/sessionUtils';

import AppContext from "./AppContext";



import * as styles from "./App.module.css"
import Header from "./Header";
import CreateAccount from "./Routes/CreateAccount";
import Login from "./Routes/Login";
import { SessionInfo, User } from "./AppContext/userTypes";

type AppProps = {};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className={styles.App}>
        <Header />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Login />
        )
      },
      {
        path: "/createAccount",
        element: <CreateAccount />
      },
      {
        path: "/:view?",
        element: (
          <div>
            
          </div>
        ),
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
