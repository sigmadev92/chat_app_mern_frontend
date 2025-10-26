import { IdCard, MailIcon, SquarePenIcon, UserPenIcon } from "lucide-react";

const ProfileCard = ({ fullName, email, userId, profilePic }) => {
  return (
    <div className="w-[200px] shadow-md shadow-amber-600 flex flex-col rounded-md p-2 dark:">
      <div className="h-[150px] w-full relative">
        <img src={profilePic} className="h-full w-full outline-1" />
        <button className="absolute bottom-3 right-[1rem] dark:text-white text-blue-400 p-1 rounded-full hover:bg-amber-100 dark:hover:bg-blue-400 ">
          <SquarePenIcon color="#000" size={20} />
        </button>
      </div>
      <div className="mt-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">{fullName}</h3>{" "}
          <button className="dark:text-white text-blue-400 p-1 rounded-full hover:bg-amber-100 dark:hover:bg-blue-400">
            <UserPenIcon size={20} />
          </button>
        </div>
        <p className="text-[0.8rem] flex gap-1 items-center">
          {" "}
          <MailIcon size={15} color="#1212ff" />
          {email}
        </p>
        <p className="text-[0.8rem] flex gap-1 items-center">
          <IdCard size={15} color="#6767dd" />
          {userId}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
