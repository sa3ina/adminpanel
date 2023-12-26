import AdminRoot from "../pages/AdminRoot";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Detail from "../pages/Detail";
import Notification from "../pages/Notification";
export const routes = [
  {
    path: "/",
    element: <AdminRoot />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/adduser",
        element: <AddUser />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
    ],
  },
];
