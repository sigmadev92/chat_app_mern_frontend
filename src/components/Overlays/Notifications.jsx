import { CircleXIcon } from "lucide-react";
import React from "react";

function Notifications({ close }) {
  return (
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[50%] rounded-2xl outline-blue-300 outline-1 h-[80%]">
        <div className="flex px-3 justify-between items-center py-2">
          <span className="text-white text-[12px]">Notifications</span>
          <button onClick={() => close(false)}>
            <CircleXIcon className="text-red-400 hover:text-red-800 h-[1rem]  cursor-pointer" />
          </button>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Notifications;
