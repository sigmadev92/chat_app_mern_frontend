import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
import PageHeader from "../../components/other/PageHeader";
import Left from "./components/Left";
import Right from "./components/Right";
function Dashboard() {
  const { user } = useSelector(authSelector);
  return (
    <section className="dark:bg-gray-900 text-black dark:text-white h-full">
      <PageHeader name={"Dashboard"} />
      <div className="flex px-5 justify-between">
        <Left user={user} />

        <Right />
      </div>
    </section>
  );
}

export default Dashboard;
