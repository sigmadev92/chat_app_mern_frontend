import { useSelector } from "react-redux";
import ChatContainer from "./ChatContainer/index";
import NoChat from "./NoChat";
import { chatSelector } from "../../../../redux_toolkit/reducers/chatReducer";
const Right = () => {
  const { currentlyChattingTo } = useSelector(chatSelector);
  return (
    <div className="max-w-[350px] min-w-[300px] flex justify-center items-center h-[90%]  pr-2">
      {currentlyChattingTo.user ? <ChatContainer /> : <NoChat />}
    </div>
  );
};

export default Right;
