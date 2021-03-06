import { useEffect, useState } from "react";
import { IUser } from "../../types";
import { getUser } from "../../utilities/api";
import "./User.css";

export default function User() {
  const [user, setUser] = useState<IUser>({});

  useEffect(() => {
    (async () => {
      let { data } = await getUser();
      console.log(data);
      setUser(data);
    })();
  }, []);

  console.log(user);

  if (!user) {
    return <div>...loading</div>;
  }

  return (
    <div className="profile">
      <img src={user.img} alt="" />
      <h1 className="name">{user.name}</h1>
    </div>
  );
}
