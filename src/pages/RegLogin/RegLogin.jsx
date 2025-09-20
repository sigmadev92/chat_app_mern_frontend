import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  verifyFullNameField,
  verifyPasswrod,
} from "../../functions/validators/regLogin";
import { usersURL } from "../../functions/urls/backendAPI";
import toast from "react-hot-toast";
import {
  authActions,
  authSelector,
} from "../../redux_toolkit/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
function RegLogin() {
  const { loggedIn } = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = form;
  const { action_type } = useParams();
  const mapAuth = {
    register: "Register",
    login: "Login",
  };
  const navigate = useNavigate();
  if (!["register", "login"].includes(action_type)) {
    return <Navigate to={"/action/login"} />;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (action_type === "register" && !verifyFullNameField(fullName)) {
      toast.error("Name Format Invalid");
      return;
    }
    if (!verifyPasswrod(password)) {
      toast.error("Password Invalid");
      return;
    }
    let fields = { fullName, email, password };
    if (action_type === "login") {
      fields = { email, password };
    }
    setForm({ fullName: "", email: "", password: "" });
    try {
      // using fetch
      const result = await fetch(`${usersURL}/${action_type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        credentials: "include", // 👈 this ensures cookies are set in browser
      });

      const data = await result.json();

      if (data.success) {
        if (action_type === "login") {
          toast.success("Login Successful");
          dispatch(authActions.setAuth(data.user));
          navigate("/action/home");
        } else {
          toast.success("Registration Successful");
          navigate("/action/login");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (loggedIn) {
    return <Navigate to={"/"} />;
  }
  return (
    <section>
      <div>
        <h2>{mapAuth[action_type]}</h2>
      </div>
      <div className="w-[80%] flex justify-between mx-auto rounded-4xl p-4 mt-20 ">
        <div className="w-[45%]"></div>
        <div className="w-[30%] bg-[#4f3a805c] p-2 rounded-2xl">
          <div className="text-center mb-4 text-white text-3xl">
            <span>F3</span>
            <span>Chat | </span>
            <span className="text-[#e8edf0] text-[17px] font-bold">
              {mapAuth[action_type]}
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[1rem] items-center "
          >
            {action_type === "register" && (
              <div className="">
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="fullName"
                  value={fullName}
                  className="outline-none border-b-[1px] text-white border-b-[#fff] placeholder:text-[12px] placeholder:text-[#ffffff9b]"
                  placeholder="full name"
                  required
                  name="fullName"
                />
              </div>
            )}
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="outline-none border-b-[1px] text-white border-b-[#fff] placeholder:text-[12px] placeholder:text-[#ffffff9b]"
                placeholder="email"
                required
                value={email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="relative ">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="outline-none border-b-[1px] text-white border-b-[#fff] placeholder:text-[12px] placeholder:text-[#ffffff9f]"
                placeholder="password"
                required
                name="password"
                value={password}
                onChange={handleChange}
              />
              {!isPasswordVisible ? (
                <img
                  alt="eye"
                  src="https://cdn-icons-png.flaticon.com/512/9759/9759376.png"
                  className="absolute top-[2rem] right-0 w-[20px] bg-transparent cursor-pointer"
                  onClick={() => setPasswordVisible(true)}
                />
              ) : (
                <img
                  alt="eye"
                  src="https://cdn-icons-png.freepik.com/512/7610/7610127.png"
                  className="absolute top-[2rem] right-0 w-[20px] cursor-pointer"
                  onClick={() => setPasswordVisible(false)}
                />
              )}
            </div>

            <button
              type="submit"
              className="text-white cursor-pointer outline-1 hover:text-blue-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-1 text-center"
            >
              {mapAuth[action_type]}
            </button>
          </form>
          <div className="footer flex flex-col gap-0.5rem text-white text-[12px] mt-2 px-3">
            <div>
              {action_type === "register" ? (
                <NavLink
                  to={"/action/login"}
                  className={"  hover:text-[#e313cb]"}
                >
                  Already have an account? Sign in
                </NavLink>
              ) : (
                <NavLink
                  to={"/action/register"}
                  className={"  hover:text-[#e9107d]"}
                >
                  Don't have an account? Sign up
                </NavLink>
              )}
            </div>
            <div className="flex justify-end ">
              <NavLink to={"/password/recover"} className={" hover:underline"}>
                Forgot Password
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegLogin;
