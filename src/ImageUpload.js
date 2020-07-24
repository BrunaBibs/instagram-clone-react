import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    // get the first file that the user selects
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // storage in firebase db store the image with the name of the upload
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      // this is for the user to know how long will it take to upload
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          //from 0 to 100 it indicates how long it takes base on how much info is send across and how much is left
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside of db
            db.collection("posts").add({
              // to sort all the posts by the correct timing (recent to the top)
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            // to start at 0 and not to be stuck at 100
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
