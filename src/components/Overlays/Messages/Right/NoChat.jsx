import { MessageCircleIcon } from "lucide-react";

const NoChat = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <MessageCircleIcon className="h-[4rem] " />
      <p className="text-[0.8rem] dark:text-[aqua] text-amber-400 text-center">
        Select A chat to view messages and start conversation{" "}
      </p>
    </div>
  );
};

export default NoChat;
