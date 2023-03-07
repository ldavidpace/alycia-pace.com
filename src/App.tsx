import * as React from "react";
import {
  Outlet,
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";

import MainList from "./MainList";
import Tabs from "./Tabs/Tabs";
import FeatureDisplay from "./FeatureDisplay";
import AdminView from "./AdminView";
import Analytics from "./Analytics";

import * as styles from "./App.module.css"

type AppProps = {};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          <Link
            to={"/"}
            className={styles["Main-Link"]}
            onClick={() => Analytics.track("navigate", { id: "MainLink" })}
          >
            <h1 className={styles["App-title"]}>Alycia Pace</h1>
          </Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminView />,
      },
      {
        path: "/:view?",
        element: (
          <React.Fragment>
            <Tabs />
            <FeatureDisplay />
            <MainList />
          </React.Fragment>
        ),
      },
    ],
  },
]);

class App extends React.Component<AppProps> {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
