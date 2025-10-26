import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
function Home() {
  const { loggedIn, user } = useSelector(authSelector);
  return (
    <section className="h-full bg-white dark:bg-[#000000dd]">
      <div className="p-2">
        <h2 className="text-sm">
          {loggedIn ? "Hey, " + user?.fullName.split(" ")[0] : "Home"}
        </h2>
      </div>
      <div className="flex justify-center items-center h-full">
        {loggedIn ? (
          <div className="w-[300px] h-[300px]">
            <h2 className="text-5xl text-black dark:text-white">F3 Chat</h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
}

export default Home;
