import { useState } from "react";
import toast from "react-hot-toast";
import { usersURL } from "../../functions/urls/backendAPI";
import { authActions } from "../../redux_toolkit/reducers/authReducer";
import { useDispatch } from "react-redux";
import { defaultProfile } from "../../functions/urls/images";
const UpdateProfile = ({ user }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profilePic) {
      toast.error("Please choose a profile picture");
      return;
    }
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    try {
      const response = await fetch(`${usersURL}/profile-pic`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }
      const data = await response.json();

      if (data.success) {
        toast.success("Profile Pic changed successfully");

        dispatch(authActions.setProfilePic(data.imageName));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] rounded-2xl outline-blue-300 outline-1 h-[80%] bg-white flex flex-col gap-[1rem] items-center justify-center">
        {preview ? (
          <div className="h-[200px] w-[200px]">
            <img src={preview} alt="Preview" className="w-full h-full border" />
          </div>
        ) : (
          <div className="h-[200px] w-[200px]">
            <img
              className="w-full h-full"
              src={user.profilePic || defaultProfile}
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-1"
        >
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            className="hide"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
          />
          <label
            htmlFor="profilePic"
            className="btn bg-blue-600 hover:bg-blue-700 text-white"
          >
            Choose a profile pic
          </label>
          <div className="flex gap-2">
            <button type="submit" className="btn bg-green-600 text-white">
              Update
            </button>
            <button
              type="button"
              onClick={() => dispatch(authActions.setUpdateProfileDiv(false))}
              className="btn bg-gray-500 text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
