"use client";

import { useState } from "react";
import { useAuth } from "@pangeacyber/react-auth";

import styles from "../page.module.css";
import pageWithAuthentication from "../../components/pageWithAuthentication";

const Filescan = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("files", selectedFile, selectedFile.name);
    console.log(selectedFile);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log("submitted!");
  };

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>
          Please upload your file to get it scanned by the Pangea File Scan
          service
        </h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleClick}>Upload!</button>
      </div>
    </main>
  );
};

export default pageWithAuthentication(Filescan);
