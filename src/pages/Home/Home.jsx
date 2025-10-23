import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
function Home() {
  const { loggedIn, user } = useSelector(authSelector);
  return (
    <section className="h-full bg-red-200 dark:bg-[#000000dd]">
      <div>
        <h2>{loggedIn ? "Hey, " + user?.fullName.split(" ")[0] : "Home"}</h2>
      </div>
      {loggedIn && (
        <>
          <div></div>
        </>
      )}
    </section>
  );
}

export default Home;
