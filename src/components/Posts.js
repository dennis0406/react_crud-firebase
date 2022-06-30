import React from "react";
import { Post, PostNewest } from "./Post";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setPosts([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((p) => {
          setPosts((prev) => [...prev, p]);
        });
      }
    });
  }, []);
  var today = Date.now();

  var postsSort = posts;
  var postSmall = [];
  for (var i = 0; i < postsSort.length; i++) {
    for(var j = 1; j<postsSort.length; j++ ){
      if(postsSort[i].created < postsSort[j].created){
        let temp = postsSort[i]
        postsSort[i] = postsSort[j]
        postsSort[j] = temp
      }
    }
  }

  for (var x = 1; x < postsSort.length; x++) {
    postSmall.push(<Post key={postsSort[x].id}
      image={postsSort[x].image}
      created={Math.round(
        parseInt((Math.abs(today - postsSort[x].created) / (1000 * 60)) % 60)
      )}
      qtyComments={postsSort[x].comment}
      titlef={postsSort[x].title}
    />)
  }


  

  return (
      <div className="post__container">
      <div className="post__newest">
      {postSmall.length !==0 ? <PostNewest
            image={posts[0].image}
            created={Math.round(
              parseInt((Math.abs(today - posts[0].created) / (1000 * 60)) % 60)
            )}
            qtyComments={posts[0].comment}
            titlef={posts[0].title}
          /> : ""}
      </div>
      <div className="posts__list--small">
        {postSmall}
      </div>
    </div>
    
  );
}

export default Posts;
