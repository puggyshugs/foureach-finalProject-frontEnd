import css from "./UserPosts.module.css";
import React, { useState, useEffect } from "react";
import PostsInput from "../PostsInput";
import { useAuth0 } from "@auth0/auth0-react";

function UserPosts() {
  const [click, setClick] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postChange, setPostChange] = useState(false);

  const { user } = useAuth0();

  useEffect(() => getPost(), [postChange, click]); //need to add empty dependency array (without it it is an infinite loop)

  async function getPost() {
    const response = await fetch("https://localhost:5001/posts");
    const resData = await response.json();
    //return data;
    setPosts(resData);
    return posts;
  }

  async function handleClick(id) {
    const response = await fetch(`https://localhost:5001/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // const resData = await response.json();
    // console.log(resData);

    setClick(!click);
    //return text;
  }

  return (
    <div className={css.PostsDiv}>
      <ul className={css.postList}>
        {posts &&
          posts.map((post, i) => (
            <li className={css.listItemContainer} key={i}>
              <item className={css.nameTitle}>{post.name}</item>
              {post.content}{" "}
              <button
                className={css.deleteButton}
                disabled={post.name !== user.name}
                onClick={() => handleClick(post.id)}
              >
                {" "}
                X{" "}
              </button>
            </li>
          ))}
      </ul>
      <PostsInput postChange={postChange} setPostChange={setPostChange} />
    </div>
  );
}

export default UserPosts;
