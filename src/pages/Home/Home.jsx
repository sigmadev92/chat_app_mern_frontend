import { authSelector } from "../../redux_toolkit/reducers/authReducer";
import { useSelector } from "react-redux";
function Home() {
  const { loggedIn } = useSelector(authSelector);
  return (
    <section className="h-full bg-white dark:bg-[#000000dd]">
      <div className="p-2 text-black dark:text-white"></div>
      <div className="flex justify-center items-center h-full">
        {loggedIn ? (
          <div></div>
        ) : (
          <div className="text-center shadow-md shadow-amber-200 rounded-xl p-2">
            <h2 className="text-[4rem] text-shadow-indigo-500 text-blue-500 font-extrabold">
              F3
            </h2>
            <p className="dark:text-white text-black text-3xl">
              <span>Fast</span> <span>Fun</span> <span>Free</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
