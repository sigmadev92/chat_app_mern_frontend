import React from "react";
import { askActions } from "../../redux_toolkit/reducers/AskReducer";
import { askSelector } from "../../redux_toolkit/reducers/AskReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { authActions } from "../../redux_toolkit/reducers/authReducer";
import { usersURL } from "../../functions/urls/backendAPI";
import { useNavigate } from "react-router-dom";

function Ask() {
  const dispatch = useDispatch();
  const { question } = useSelector(askSelector);
  const navigate = useNavigate();

  const { closeAskPopup } = askActions;
  const logoutUser = async () => {
    await fetch(`${usersURL}/logout`, { credentials: "include" });
    dispatch(authActions.logoutUser());
    dispatch(closeAskPopup());
    navigate("/action/login");
    toast.success("Logged out successfully");
  };
  return (
    <section className="absolute top-0 left-0 w-[100%] h-[100vh] bg-[#18161878] z-10 flex justify-center items-center">
      <div className="outline-1 rounded-2xl p-[2rem] shadow-lg shadow-[#1489ef] ">
        <h3 className="text-white my-2">{question}</h3>
        <div className="flex gap-3 mt-3">
          <button
            className="px-3 py-1 outline-1 rounded-[0.3rem] font-bold text-[#23a023] hover:text-[#00ff00] cursor-pointer"
            onClick={logoutUser}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 outline-1 rounded-[0.3rem] font-bold text-[#ec2626b9] hover:text-[#ff0000] cursor-pointer"
            onClick={() => {
              dispatch(closeAskPopup());
            }}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}

export default Ask;
