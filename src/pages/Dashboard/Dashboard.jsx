import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
function Dashboard() {
  const { user, token } = useSelector(authSelector);
  return (
    <section>
      <div>
        <h2>Dashboard</h2>
      </div>
      <div className="w-[45%] ml-3 text-white ">
        <p>User Details</p>
        <p> Id : {user._id}</p>
        <p>Name : {user.fullName}</p>
        <p>Email : {user.email}</p>
        <p>Token : {token.slice(0, 23)}</p>
      </div>
    </section>
  );
}

export default Dashboard;
