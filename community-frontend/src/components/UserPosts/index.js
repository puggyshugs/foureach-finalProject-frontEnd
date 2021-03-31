import css from "./UserPosts.module.css";
import React, { useState, useEffect } from "react";
import PostsInput from "../PostsInput";
import { useAuth0 } from "@auth0/auth0-react";

function UserPosts() {
  const [click, setClick] = useState(true);
  const [posts, setPosts] = useState([]);
  const [deleteId, setDeleteId] = useState(1);
  const { user } = useAuth0();

  useEffect(() => getPost(), [click]); //need to add empty dependency array (without it it is an infinite loop)

  async function getPost() {
    const response = await fetch("https://localhost:5001/posts");
    const resData = await response.json();
    //return data;
    setPosts(resData);
    return posts;
  }

  // function addItemToList(text) {
  //   const newPostsList = [...posts, { title: text }];
  //   setPosts(newPostsList);
  // }
  // function deleteItemFromList(index) {
  //   const deletedTodosList = [
  //     ...todos.slice(0, index),
  //     ...todos.slice(index + 1),
  //   ];
  //   setToDos(deletedTodosList);
  // }

  async function handleClick(id) {
    const response = await fetch(`https://localhost:5001/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const resData = await response.json();
    console.log(resData.id);
    setDeleteId(resData.id);
    setClick(!click);
    //return text;
  }

  return (
    <div className={css.PostsDiv}>
      <ul className={css.postList}>
        {posts &&
          posts.map((post, i) => (
            <li key={i}>
              {post.name} {post.content}{" "}
              <button
                disabled={post.name !== user.name}
                onClick={() => handleClick(post.id)}
              >
                {" "}
                X{" "}
              </button>
            </li>
          ))}
      </ul>
      <PostsInput />
    </div>
  );
}

export default UserPosts;
