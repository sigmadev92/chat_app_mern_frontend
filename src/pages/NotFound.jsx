import React from "react";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <section className="h-[100vh] bg-[#261e1ed1] flex justify-center items-center ">
      {" "}
      <div className="p-3">
        <h3 className="text-[#ff0000d1] text-2xl">Route Not Found </h3>
        <NavLink to={"/"} className="text-white ">
          Click here to go to home page
        </NavLink>
      </div>
    </section>
  );
}

export default NotFound;
