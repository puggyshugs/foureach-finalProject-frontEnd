import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import css from "./Profile.module.css";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={css.profilePageContainer}>
    <div className={css.profileInfoContainer}>
      <img className={css.image} src={user.picture} alt="profile"></img>
      <h2>{user.name}</h2>
      <p>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      </div>
    </div>
  );
};

export default Profile;
