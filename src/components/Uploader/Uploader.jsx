import axios from "axios";
import React, { useState } from "react";
import "./Uploader.css";

export default function Uploader() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      if (files.length == 0) {
        setMessage("Please select a file.");
      } else {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          // files[i] = file you chose in the uploader
          // file = name of the files
          formData.append("file", files[i]);
        }
        let jwt = localStorage.getItem("token");
        console.log("this is jwt", jwt);
        const result = await axios.post("/api/files", formData, {
          headers: {
            "Content-Type": "multipart/form.data",
            Authorization: "Bearer " + jwt,
          },
        });
        console.log(result.data);
        setMessage("File successfully uploaded!");
      }
    } catch (err) {
      console.log(err);
      setMessage("Error while uploading");
    }
  };

  return (
    <div className="Wrapper">
      <div className="Upload">
        <form>
          <input
            type="file"
            accept="image/png, application/pdf, image/jpeg"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          ></input>
          <button onClick={handleSubmit} type="submit">
            Upload
          </button>
        </form>
      </div>
      <div style={{ color: "red" }}>{message}</div>
    </div>
  );
}
