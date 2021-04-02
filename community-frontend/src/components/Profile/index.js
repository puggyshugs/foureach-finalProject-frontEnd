import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import css from "./Profile.module.css";
import { MDBInput } from "mdbreact";
import { StatHelpText } from "@chakra-ui/stat";

const Profile = () => {
  const { loading, user } = useAuth0();
  const [bio, setBio] = useState("");
  const [text, setText] = useState("");

  if (loading || !user) {
    return <div>Loading...</div>;
  }
  function updateBio(e) {
    setBio(e.target.value);
  }

  function addToBio() {
    setText(bio);
  }

  return (
    <div className={css.profilePageContainer}>
      <div className={css.profileInfoContainer}>
        <img className={css.image} src={user.picture} alt="profile"></img>
        <h2 className={css.profileName}>{user.name}</h2>
        <MDBInput
          className={css.inputField}
          type="textarea"
          label="Type notification..."
          rows="2"
          icon="paint-brush"
          onChange={(e) => updateBio(e)}
        />
        <button className={css.addBioButton} onClick={() => addToBio(text)}>
          Add bio
        </button>
        <div className={css.bioTextBox}>
          <p className={css.bioText}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
