import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import css from './Profile.module.css';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Card className={css.container} style={{ width: "30rem" }}>
      <Card.Img className={css.image} variant="top" src={user.picture} alt="Profile Picture" />
      <Card.Body>
        <Card.Title>
          <h2>{user.name}</h2>
        </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;
