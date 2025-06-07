import axios from "axios";
import React, { useState } from "react";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file, file.name);

      try {
        const result = await axios.post("/img", formData);

        console.log(result);
        console.log("Upload success:", result.data);
      } catch (err: any) {
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Body returned:", err.response.data);
        } else {
          console.error(err);
        }
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}
    </>
  );
};

export default SingleFileUploader;
