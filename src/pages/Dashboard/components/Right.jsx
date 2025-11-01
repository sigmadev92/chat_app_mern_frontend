import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileCard from "../../../components/other/ProfileCard";

const Right = ({ user }) => {
  const [tab, setTab] = useState("1");
  return (
    <div className="w-[100%] md:w-[80%] outline-1 min-h-[400px] rounded-md">
      <div className="px-2 py-1">
        <ul className="list-none flex gap-1">
          <li className="block md:hidden">
            <button
              className="bg-gray-200 text-[12px] btn text-black"
              onClick={() => {
                setTab("1");
              }}
            >
              Me
            </button>
          </li>
          <li>
            <button
              className="bg-gray-200 text-[12px] btn text-black"
              onClick={() => setTab("2")}
            >
              Analytics
            </button>
          </li>
          <li>
            <NavLink
              to={`/public/profile/${user._id}`}
              className="text-[12px] btn  bg-amber-400 "
            >
              Public Profile
            </NavLink>
          </li>
          <li>
            <button className="bg-red-600 text-[12px] text-white btn ">
              Delete Account
            </button>
          </li>
        </ul>
      </div>
      <hr />
      <div className="p-2">
        <div className=" block md:hidden">{tab === "1" && <ProfileCard />}</div>
        {tab === "2" && <>Analytics</>}
      </div>
    </div>
  );
};

export default Right;
