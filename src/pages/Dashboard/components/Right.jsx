import React from "react";
import { NavLink } from "react-router-dom";

const Right = () => {
  return (
    <div className="w-[80%] outline-1 min-h-[400px] rounded-md">
      <div className="px-2 py-1">
        <ul className="list-none flex gap-1">
          <li>
            <button className="bg-gray-200 text-[12px] btn text-black">
              Analytics
            </button>
          </li>
          <li>
            <NavLink
              to={"/public/profile"}
              className="text-[12px] btn  bg-amber-400 "
            >
              Public Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default Right;
