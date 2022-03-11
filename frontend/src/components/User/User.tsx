import { useEffect, useState } from "react";
import { IUser } from "../../types";
import { api } from "../../utilities/api";
import "./User.css";

export default function User() {
  const [user, setUser] = useState<IUser>({});

  useEffect(() => {
    (async () => {
      let { data } = await api.get("/spotify/user");
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
      <img src={user.img} />
      <h1 className="name">{user.name}</h1>
    </div>
  );
}
