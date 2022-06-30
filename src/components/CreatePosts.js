import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import { uid } from "uid";
import { ref as refd, set, update } from "firebase/database";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

export function CreatePosts(props) {
  const [title, setTitle] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const imageRef = useRef(null);

  const resetInput = () => {
    //reset input
    imageRef.current.value = null;
    setTitle("");
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name + uid();
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // url is link of image
        writeToDatabase(url, imageName); // call function to create data on firebase
      });
    });
  };

  const handleUpdate = (post) => {
    if (imageUpload == null) {
      update(refd(db, `/${post.id}`), {
        id: post.id,
        title: title,
        image: post.image,
        created: Date.now(),
        comment: post.id,
        imageName: post.imageName,
      });
    } else {
      const imageName = imageUpload.name + uid();
      const imageRef = ref(storage, `images/${imageName}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          update(refd(db, `/${post.id}`), {
            title: title,
            image: url,
            created: Date.now(),
            comment: post.id,
            imageName: imageName,
          });
        });
      });
    }

    resetInput();
  };

  // console.log(JSON.parse(localStorage.getItem("postTemp")));

  // useEffect(() => {
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrl((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  //write data into firebase
  const writeToDatabase = (url, imgName) => {
    const uuid = uid();

    set(refd(db, `/${uuid}`), {
      id: uuid,
      title: title,
      image: url,
      created: Date.now(),
      comment: 0,
      imageName: imgName,
    });

    resetInput();
  };

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="title"
          type="text"
          placeholder="Title of the post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="title">Title of the post</label>
      </div>

      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="image"
          ref={imageRef}
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
          placeholder="Image of the post"
          required
        />
        <label htmlFor="image">Image of the post</label>
      </div>

      <div className="form-floating mb-3">
        {!props.isEdit ? (
          <button className="btn btn-success" onClick={uploadImage}>
            Create
          </button>
        ) : (
          <>
            <button
              className="btn btn-success"
              onClick={() => handleUpdate(props.post)}
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
}
