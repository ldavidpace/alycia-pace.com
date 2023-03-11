import * as React from "react";
import {
  Outlet,
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";

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
            <h1 className={styles["App-title"]}>Quiz Central</h1>
          </Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/:view?",
        element: (
          <React.Fragment>

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
