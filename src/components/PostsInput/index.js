import css from "./Input.module.css";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { MDBInput } from "mdbreact";


function PostsInput({ setPostChange, postChange }) {
  const [text, setText] = useState("");
  const[image, setImage] = useState('');
  const { user } = useAuth0();

  const uploadImage = async e =>
  {
      const files = e.target.files;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'imageupload')
     
      const res=await fetch('https://api.cloudinary.com/v1_1/dmxpnf9fs/image/upload',
      {
          method: 'POST',
          body: data
      }
      )
      const file = await res.json();
      setImage(file.secure_url);
 

  }


  function updateText(e) {
    setText(e.target.value);
  }

  async function handleClick(content, image) {
    const response = await fetch(process.env.REACT_APP_BACKEND_POSTS_URL, {
      method: "POST",
      body: JSON.stringify({ content: content, name: user.name, postImage: image}), // myLat and myLng
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const resData = await response.json();
    setPostChange(!postChange);
    console.log({ resData });
    //setText(resData.content);
    // return text;
  }

  return (
    <div className={css.input}>
      <h5 className={css.inputTitle}>
        Let your community know what you're thinking...
      </h5>
      <MDBInput
        className={css.inputField}
        type="textarea"
        label="Type notification..."
        rows="2"
        icon="pencil-alt"
        onChange={(e) => updateText(e)}
      />
     <input type="file" name="file" onChange={uploadImage} />
     <img src={image} style={{width: '300px'}} alt='userimage'/>
      <Button
        onClick={() => handleClick(text, image)}
        leftIcon={<ChatIcon />}
        className={css.sendMessageButton}
      >
        Post
      </Button>
    </div>
  );
}

export default PostsInput;
// onChange={(e) => updateText(e)}
// type="text"
