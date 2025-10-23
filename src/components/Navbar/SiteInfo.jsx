import { ChartBar } from "lucide-react";
import styles from "./navbar.module.css";
function SiteInfo() {
  return (
    <div className="flex gap-1">
      <div className="h-[2rem] w-[2rem] rounded-full flex justify-center items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6995/6995660.png"
          alt="logo"
          className="h-[2rem]"
        />
      </div>
      <div className={styles.text}>
        <h1 className="">
          <span className="font-bold dark:text-white text-xl">F3</span>
        </h1>
      </div>
    </div>
  );
}

export default SiteInfo;

{
  /* <button
                className="text-white"
                onClick={() =>
                  console.log(
                    totalUnseenMessages,
                    onlineUsers,
                    currentlyChattingTo
                  )
                }
              >
                click
              </button> */
}
