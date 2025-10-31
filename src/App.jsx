import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import RegLogin from "./pages/RegLogin/RegLogin";
import EditProfile from "./pages/EditProfile/EditProfile";
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
import { themeAction } from "./redux_toolkit/reducers/themeReducer";

function App() {
  const dispatch = useDispatch();

  const { user } = useSelector(authSelector);

  useEffect(() => {
    const savedTheme = localStorage.getItem("f3_theme") || "light";
    dispatch(themeAction.setTheme(savedTheme));
    dispatch(fetchLoginStatus());

    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (user) {
      initSocket(user._id, dispatch);
      dispatch(fetchUnseenMessages());
    }
  }, [user, dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "action/:action_type", element: <RegLogin /> },
        { path: "password/recover", element: <RecoverPswrd /> },
        { path: "public/profile/:userId", element: <EditProfile /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />

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
    </div>
  );
}

export default App;
