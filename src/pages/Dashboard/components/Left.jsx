import ProfileCard from "../../../components/other/ProfileCard";

const Left = ({ user }) => {
  const { fullName, email, _id, profilePic } = user;

  return (
    <div>
      {!profilePic && (
        <p className="text-sm text-red-400">You don't have a profile pic yet</p>
      )}
      <ProfileCard
        fullName={fullName}
        email={email}
        userId={_id}
        profilePic={profilePic}
      />
    </div>
  );
};

export default Left;
