import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { usersURL } from "../../functions/urls/backendAPI";

function PublicProfile() {
  const params = useLocation();
  const userId = params.pathname.slice(1).split("/")[2];
  const [userProfie, setUserProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${usersURL}/profile/${userId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          toast.error("Error Fetching the details", response.status);
          navigate("/*");
          return;
        }

        const data = await response.json();
        if (data.success) {
          setUserProfile(data.user);
          navigate("/*");
          return;
        }

        toast.error(data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };

    if (!userId || userId.length < 24) {
      toast.error("Invalid Link");
      navigate("/*");
      return;
    }

    fetchUserInfo();
  }, []);
  return <section>{userProfie && <div>{userProfie.fullName}</div>}</section>;
}

export default PublicProfile;
