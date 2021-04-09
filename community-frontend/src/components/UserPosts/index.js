import css from "./UserPosts.module.css";
import React, { useState, useEffect } from "react";
import PostsInput from "../PostsInput";
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteIcon } from "@chakra-ui/icons";

function UserPosts() {
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [click, setClick] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postChange, setPostChange] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { user } = useAuth0();

  useEffect(() => getPost(), [postChange, click]); //need to add empty dependency array (without it it is an infinite loop)

  function seeMoreShowOrHide() {
    setShowSeeMore(true);
  }

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

  //  makeaMap() { if myLat[i] || myLng[i] == null }(dontmakeamap) else (makeamap)

  return (
    <div className={css.outerDivContainer}>
      <div className={css.postsDiv}>
        <ul className={css.postList}>
          {posts &&
            posts.map((post, i) => (
              <li className={css.listItemContainer} key={i}>
                <item className={css.nameTitle}>{post.name}</item>
                <item className={css.contentBox}>
                  {readMore ? (
                    post.content
                  ) : (
                    <>
                      <div>
                        {post.content.length < 150 && post.content}
                      </div>
                      <div hidden={post.content.length < 150}>
                        {post.content.length > 150 && post.content.match(/(.{1,99}\w)\s/)[1]}&hellip;
                      </div>
                    </>
                  )}

                  <button
                    hidden={post.content.length < 150}
                    className={css.readMoreButton}
                    onClick={() => setReadMore(!readMore)}
                  >
                    {!readMore ? "read more" : "show less"}
                  </button>
                </item>

                {/* <br></br> */}
                <div className={css.buttonDiv}>
                  <button
                    className={css.deleteButton}
                    hidden={post.name !== user.name}
                    onClick={() => handleClick(post.id)}
                  >
                    {<DeleteIcon />}
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <PostsInput postChange={postChange} setPostChange={setPostChange} />
    </div>
  );
}

export default UserPosts;
