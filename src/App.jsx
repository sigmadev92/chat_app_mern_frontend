import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import RegLogin from "./pages/RegLogin/RegLogin";
import EditProfile from "./pages/EditProfile/EditProfile";
import Doc from "./pages/Documentation/Doc";
import NotFound from "./pages/NotFound";
import RecoverPswrd from "./pages/ForgotPassword/RecoverPswrd";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import {
  authSelector,
  fetchLoginStatus,
} from "./redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
import { initSocket } from "./webSockets/socketService";
import { fetchUnseenMessages } from "./redux_toolkit/reducers/chatReducer";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector(authSelector);

  useEffect(() => {
    if (user) {
      initSocket(user._id, dispatch);
    }
  }, [user, dispatch]);
  useEffect(() => {
    dispatch(fetchLoginStatus());
    dispatch(fetchUnseenMessages());
    //eslint-disable-next-line
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "action/:action_type", element: <RegLogin /> },
        { path: "password/recover", element: <RecoverPswrd /> },
        { path: "edit-profile", element: <EditProfile /> },
        { path: "docs", element: <Doc /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ]);
  return (
    <section className="app">
      <div className="app2s"></div>
      <RouterProvider router={router}></RouterProvider>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </section>
  );
}

export default App;
