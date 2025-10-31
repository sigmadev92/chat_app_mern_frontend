import { useState } from "react";
import toast from "react-hot-toast";
import { authActions } from "../../redux_toolkit/reducers/authReducer";
import { useDispatch } from "react-redux";
import { _default } from "../../functions/urls/images";
import { usersURL } from "../../functions/urls/backendAPI";
import genderRadioOptions, {
  genderMap,
} from "../../functions/static_data/genderRadio";

const UpdateProfile = ({ user }) => {
  const [formData, setFormData] = useState(user);
  const dispatch = useDispatch();

  const { fullName, gender, email, _id } = formData;
  const handlChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(
        `${usersURL}/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
        "Content"
      );
      if (!response.ok) {
        toast.error("Failed to update the details");
        return;
      }
      const data = await response.json();
      if (data.success) {
        console.log(data.response);
        dispatch(authActions.updateUser(data.response));
        toast.success("Data Updated Successfully");
        return;
      }
      toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <section className="w-[100%] h-[100vh] bg-[#26252683] absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[95%] md:w-[50%] rounded-2xl outline-blue-300 outline-1 h-[80%] bg-white flex flex-col gap-[1rem] ">
        <p className="font-bold underline-offset-2 text-fuchsia-400 mx-auto">
          User ID : {_id}
        </p>
        <form
          onSubmit={handleSubmit}
          encType="application/json"
          className="text-[14px] flex flex-col gap-3 w-[60%] mx-auto shadow-blue-200 shadow-md p-2"
        >
          <div className="flex justify-between items-center">
            <label className="font-bold">Name</label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={handlChange}
              className=" border-[1px] rounded-sm px-3"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="font-bold">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              disabled
              className=" border-[1px] rounded-sm px-3"
            />
            {/* <LockIcon size={15} /> */}
          </div>
          <div className="flex justify-between">
            <label className="font-bold">Gender</label>
            <span className=" border-[1px] rounded-sm px-3">
              {genderMap[gender]}
            </span>
          </div>
          <div className="flex gap-2 ">
            {genderRadioOptions.map((op, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  name="gender"
                  value={op.value}
                  id={op.name}
                  className="hide"
                  onChange={handlChange}
                />
                <label
                  htmlFor={op.name}
                  className={`btn text-[12px] ${
                    op.value === gender ? "bg-blue-500" : "bg-red-400"
                  }`}
                >
                  {op.label}
                </label>
              </div>
            ))}
          </div>

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
