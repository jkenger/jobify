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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        action: loginAction(queryClient),
      },
      {
        path: Links.DASHBOARD,
        element: <DashboardLayout />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: Links.JOBS,
            element: (
              <AllJobsProvider>
                <AllJobs />
              </AllJobsProvider>
            ),
            loader: jobLoader(queryClient),
          },
          {
            path: Links.STATS,
            element: <Stats />,
            loader: statsLoader(queryClient),
          },
          {
            path: Links.PROFILE,
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: Links.ADMIN,
            element: <Admin />,
            loader: adminLoader(queryClient),
          },
          {
            path: `${Links.EDIT_JOB}/:id`,
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: `${Links.DELETE_JOB}/:id`,
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
