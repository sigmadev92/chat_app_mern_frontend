import { CircleXIcon } from "lucide-react";

const Header = ({ close, label }) => {
  return (
    <div className="flex px-3 justify-between items-center py-2">
      <h2 className=" text-xl font-bold">{label}</h2>

      <button onClick={() => close(false)}>
        <CircleXIcon className="text-red-400 hover:text-red-800 h-[1rem]  cursor-pointer" />
      </button>
    </div>
  );
};

export default Header;
