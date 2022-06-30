import React from "react";
import { db, storage } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { getStorage, ref as refs, deleteObject } from "firebase/storage";
import { useState, useEffect } from "react";
import { handleDate } from "./DateHandler";
import { CreatePosts } from "./CreatePosts";

export const DashBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

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

  //Update
  const handleUpdate = (post) => {
    localStorage.setItem("postTemp", JSON.stringify(post));
    setIsEdit(true);
  };

  const handleDelete = (post) => {
    const reff = refs(storage, `images/${post.imageName}`);

    deleteObject(reff)
      .then(() => {
        remove(ref(db, `/${post.id}`));
      })
      .catch((error) => {
        alert("Error!" + error);
      });
  };
  var count = 1;
  return (
    <div>
      <CreatePosts isEdit={isEdit} />
      <table class="table table-dark table-striped text-center ">
        <thead>
          <tr>
            <th>STT</th>
            <th>Title</th>
            <th>Image</th>
            <th>Created</th>
            <th>Comments</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => (
            <>
              <tr key={post.id}>
                <td>{count}</td>
                <td>{post.title}</td>
                <td>
                  <img src={post.image} alt="" style={{ width: "200px" }} />
                </td>
                <td>{handleDate(post.created)}</td>
                <td>{post.comment}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdate(post)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger mx-3"
                    onClick={() => handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {(count += 1)}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
