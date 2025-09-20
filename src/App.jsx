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
import { fetchLoginStatus } from "./redux_toolkit/reducers/authReducer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoginStatus());
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
    </section>
  );
}

export default App;
