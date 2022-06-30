import React, { useEffect, useRef, useState } from "react";
import { uid } from "uid";
import { db, storage } from "../firebase";
import { ref, onValue, remove, set, update } from "firebase/database";
import {
  ref as refs,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { handleDate } from "../components/DateHandler";
import { Header } from "../components/Header";
import {ToastContainer, toast, Zoom} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const DashBoard = () => {
  const [posts, setPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [postTemp, setPostTemp] = useState(null);

  const [imageUpload, setImageUpload] = useState(null);
  const imageRef = useRef(null);

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
    setPostTemp(post);
    setIsEdit(true);
    setTitle(post.title);
  };

  const handleDelete = (post) => {
    if (window.confirm("Are you sure want to delete this post?")) {
      const reff = refs(storage, `images/${post.imageName}`);

      deleteObject(reff)
        .then(() => {
          remove(ref(db, `/${post.id}`));
        })
        .catch((error) => {
          alert("Error!" + error);
        });
        toast.success("Delete success!")
    }
  };

  // Create post---------------------------------------------------------------------

  const resetInput = () => {
    //reset input
    imageRef.current.value = null;
    setTitle("");
    setImageUpload(null);
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name + uid();
    const imageRef = refs(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // url is link of image
        writeToDatabase(url, imageName); // call function to create data on firebase
      });
    });
  };

  //Update
  const handleUpdateSubmit = () => {
    if (imageUpload === null) {
      update(ref(db, `/${postTemp.id}`), {
        id: postTemp.id,
        title: title,
        image: postTemp.image,
        created: Date.now(),
        comment: postTemp.comment,
        imageName: postTemp.imageName,
      });
      toast.success("Update success!");
    } else {
      const imageName = imageUpload.name + uid();
      const imageRef = refs(storage, `images/${imageName}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          update(ref(db, `/${postTemp.id}`), {
            title: title,
            image: url,
            created: Date.now(),
            comment: postTemp.comment,
            imageName: imageName,
          });
        });
      });
      const reff = refs(storage, `images/${postTemp.imageName}`);

      deleteObject(reff).then(() => {
        toast.success("Update success!");
      });
    }
    resetInput();
    setIsEdit(false)
  };


  //write data into firebase
  const writeToDatabase = (url, imgName) => {
    const uuid = uid();

    set(ref(db, `/${uuid}`), {
      id: uuid,
      title: title,
      image: url,
      created: Date.now(),
      comment: 0,
      imageName: imgName,
    });

    resetInput();
    toast.success("Create success!");
  };
  return (
    <div className=" bg-body">
      <h1 className="title">Dash Board</h1>
      <Header />
      {/* Create post */}
      <div>
        <div className="form__input-item">
          <input
            className="form__input-field"
            type="text"
            placeholder="Title of the post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form__input-item">
          <input
            className="form__input-field--file"
            ref={imageRef}
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
            placeholder="Image of the post"
            required
          />
        </div>

        <div className="form-floating mb-3">
          {!isEdit ? (
            <button className="btn btn--primary" onClick={uploadImage}>
              Create
            </button>
          ) : (
            <>
            <img src={postTemp.image} alt={postTemp.imageName} style={{width: "250px", marginTop: "20px"}}/>
              <button
                className="btn btn--primary"
                onClick={() => handleUpdateSubmit()}
              >
                Update
              </button>
              <button
                className="btn btn--danger"
                onClick={() => {setIsEdit(false)
                resetInput()}}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <table className="postTable ">
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
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>
                <img src={post.image} alt="" style={{ width: "200px" }} />
              </td>
              <td>{handleDate(post.created)}</td>
              <td>{post.comment}</td>
              <td>
                <button
                  className="btn btn--primary"
                  onClick={() => handleUpdate(post)}
                >
                  Update
                </button>
                <button 
                  className="btn btn--danger"
                  onClick={() => handleDelete(post)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
    </div>
  );
};
