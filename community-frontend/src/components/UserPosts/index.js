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
  useEffect(() => getPost(), []);
  //const posts = getPost();


//  makeaMap() { if myLat[i] || myLng[i] == null }(dontmakeamap) else (makeamap)


  return (
    <div>
      <ul>
        {posts &&
          posts.map((post, i) => (
            <li key={i}>
              {post.name} {post.content} 
              {/* pull out {post.myLat} {post.myLng}, then do voodoo on render If Not Null.  
              <makeaMap>*/}
            </li>
          ))}
      </ul>
      <PostsInput />
    </div>
  );
}

export default UserPosts;
