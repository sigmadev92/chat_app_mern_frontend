import { useDispatch, useSelector } from "react-redux";
import {
  themeAction,
  themeSelector,
} from "../../redux_toolkit/reducers/themeReducer";
import { Github, MoonIcon, SunIcon } from "lucide-react";

const SideLinks = () => {
  const { theme } = useSelector(themeSelector);
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2">
      <a
        className="dark:bg-white p-1 rounded-full bg-gray-300"
        href="https://github.com/sigmadev92/chat_app_mern_frontend"
        target="blank"
      >
        <Github size={15} color={theme === "dark" ? "black" : "white"} />
      </a>
      <button
        className="bg-gray-300 dark:bg-white p-1 rounded-full"
        onClick={() => dispatch(themeAction.toggleTheme())}
      >
        {theme === "dark" ? (
          <SunIcon size={15} />
        ) : (
          <MoonIcon size={15} color="white" />
        )}
      </button>
    </div>
  );
};

export default SideLinks;
