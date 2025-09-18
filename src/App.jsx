import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import RegLogin from "./pages/RegLogin/RegLogin";
import EditProfile from "./pages/EditProfile/EditProfile";
import Doc from "./pages/Documentation/Doc";
import NotFound from "./pages/NotFound";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "action/:action_type", element: <RegLogin /> },
        { path: "edit-profile", element: <EditProfile /> },
        { path: "docs", element: <Doc /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
