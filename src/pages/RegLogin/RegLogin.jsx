import { Navigate, useParams } from "react-router-dom";
import React from "react";
function RegLogin() {
  const { action_type } = useParams();
  if (!["register", "login"].includes(action_type)) {
    return <Navigate to={"/action/login"} />;
  }
  return (
    <section>
      <div>
        <h2>{action_type === "register" ? "Register" : "Login"}</h2>
      </div>
    </section>
  );
}

export default RegLogin;
