import "./UserPosts.css";
import React, { useState, useEffect } from "react";
import PostsInput from "../PostsInput";

function UserPosts() {
  const [posts, setPosts] = useState(null);
  async function getPost() {
    const response = await fetch("https://localhost:5001/posts");
    const resData = await response.json();
    //return data;
    setPosts(resData);
    return posts;
  }
  useEffect(() => getPost());
  //const posts = getPost();
  let handleClick = null;  // placeholder as null, correct after lunch!
  

  return (
    <div>
      <ul>
        {posts &&
          posts.map((post, i) => (
            <li key={i}>
              {post.name} {post.content} <button onClick={handleClick}> X </button>
            </li>
          ))}
      </ul>
      <PostsInput />
    </div>
  );
}

export default UserPosts;
