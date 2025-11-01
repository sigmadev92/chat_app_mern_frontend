import { CameraIcon, SendIcon } from "lucide-react";

const Footer = ({ sendMessageBtn, inputMessage, setInputMessage }) => {
  return (
    <div
      id="inputPanel"
      className="h-[10%]  p-1 flex justify-between items-center"
    >
      <button className="rounded-full bg-pink-600 p-1 hover:bg-[#a81fec] h-[2rem] w-[2rem]">
        <CameraIcon className="h-[1rem] " />
      </button>
      <textarea
        onChange={(e) => setInputMessage(e.target.value)}
        value={inputMessage}
        className={`${
          inputMessage.length > 0 ? "w-[72%]" : "w-[85%]"
        } h-[95%] rounded-2xl bg-white py-1 text-[0.8rem] placeholder:text-[#00000094] resize-none px-3 focus:outline-1 text-[#000] outline-black outline-1 dark:outline-0`}
        placeholder="type a message"
      ></textarea>
      {inputMessage.length > 0 && (
        <button
          disabled={inputMessage.length == 0}
          className="rounded-full bg-pink-600 p-1 hover:bg-[#a81fec]"
          onClick={() => {
            sendMessageBtn();
          }}
        >
          <SendIcon className="text-white h-[1rem]" />
        </button>
      )}
    </div>
  );
};

export default Footer;
