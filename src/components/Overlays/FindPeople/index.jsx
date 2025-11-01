import { useState } from "react";
import { useEffect } from "react";
import { usersURL } from "../../../functions/urls/backendAPI";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux_toolkit/reducers/authReducer";
import OverlayLayout from "../../../layouts/OverlayLayout";

function FindPeople({ close }) {
  const [choice, setChoice] = useState(0);
  const { user } = useSelector(authSelector);
  const [users, setUsers] = useState([]);
  const choices = [
    "Friends",

    "Requests Sent",
    "Requests Pending",
    "Following",
    "Followers",
    "Suggestions",
  ];
  useEffect(() => {
    const findAllUsers = async () => {
      const result = await fetch(`${usersURL}/all`, { credentials: "include" });

      const data = await result.json();
      if (data.success) {
        console.log(data.users[0]);
        setUsers(data.users);
      }
    };
    findAllUsers();
  }, []);
  return (
    <OverlayLayout label={"People"} close={close}>
      <div className="px-3">
        <ul className="flex list-none gap-1 ">
          {choices.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => setChoice(idx)}
                className={`${
                  idx === choice && "bg-[#1643b7] text-white"
                } text-[12px] px-1.5 py-1 outline-1 rounded-[0.3rem]`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr className="bg-amber-500 h-[1px] mt-1 w-[95%]" />
      {users.length > 0 ? (
        <div>
          <ul className="flex flex-col list-none">
            {users
              .filter((userItem) => userItem._id != user._id)
              .map((userItem, idx) => (
                <li key={idx} className="">
                  <h3>{userItem.fullName}</h3>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <>
          <p>No users yet</p>
        </>
      )}
    </OverlayLayout>
  );
}

export default FindPeople;
