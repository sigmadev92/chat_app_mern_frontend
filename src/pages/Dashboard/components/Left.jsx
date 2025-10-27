import ProfileCard from "../../../components/other/ProfileCard";
import { imagesURL } from "../../../functions/urls/cloudinary";

const Left = ({ user }) => {
  const { fullName, email, _id, profilePic } = user;
  return (
    <div>
      <ProfileCard
        fullName={fullName}
        email={email}
        userId={_id}
        profilePic={`${imagesURL}/${profilePic}`}
      />
    </div>
  );
};

export default Left;
