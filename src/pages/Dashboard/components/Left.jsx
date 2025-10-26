import ProfileCard from "../../../components/other/ProfileCard";

const Left = ({ user }) => {
  const { profileImg, fullName, email, _id } = user;
  return (
    <div>
      <ProfileCard
        profilePic={profileImg.url}
        fullName={fullName}
        email={email}
        userId={_id}
      />
    </div>
  );
};

export default Left;
