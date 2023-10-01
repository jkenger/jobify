import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  AllJobs,
  EditJob,
  Profile,
} from "./pages";
import { Links } from "./types";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";

import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as jobLoader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { loader as statsLoader } from "./pages/Stats";
import Admin, { loader as adminLoader } from "./pages/Admin";

import { AllJobsProvider } from "./context/AllJobsProvider";
import Stats from "./pages/Stats";

const router = createBrowserRouter([
  {
    path: Links.HOME,
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: Links.REGISTER,
        element: <Register />,
        action: registerAction,
      },
      {
        path: Links.LOGIN,
        element: <Login />,
        action: loginAction,
      },
      {
        path: Links.DASHBOARD,
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: Links.JOBS,
            element: (
              <AllJobsProvider>
                <AllJobs />
              </AllJobsProvider>
            ),
            loader: jobLoader,
          },
          {
            path: Links.STATS,
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: Links.PROFILE,
            element: <Profile />,
            action: profileAction,
          },
          {
            path: Links.ADMIN,
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: `${Links.EDIT_JOB}/:id`,
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: `${Links.DELETE_JOB}/:id`,
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
