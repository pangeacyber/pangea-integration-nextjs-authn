"use client";

import { useState } from "react";
import { useAuth } from "@pangeacyber/react-auth";

import styles from "../page.module.css";
import pageWithAuthentication from "../../components/pageWithAuthentication";
import FormData from "form-data";

var putURL;

const Filescan = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const httpPut = async (url: string, selctedFile: object) => {
    try {
      const form = new FormData();

      form.append(selectedFile.name, selectedFile, {
        contentType: "application/octet-stream",
      });
      const put_response = await fetch(url, {
        method: "PUT",
        body: form,
        retry: {limit: 5},
      })
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error.response)
        throw error;
      }
      throw error;
    }
  }

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("files", selectedFile, selectedFile.name);
    console.log(selectedFile);

    const staticData = await fetch("/api/get_url", {
      method: "POST",
      body: formData,
    }, { cache: 'no-store' });
    const resp = await staticData.json();
    const putResp = await httpPut(resp.putURL, selectedFile)
    const request_id = resp.request_id;
    console.log("reqid:", request_id);
    const finalResult = await fetch("/api/get_result", {
      method: "POST",
      body: JSON.stringify({request_id: request_id}),
      headers: {
        contentType: "application/json",
      },
    }, { cache: 'no-store' });
    var final_json = await finalResult.json()
    console.log("result:", final_json);
    document.getElementById('result_target').innerHTML = JSON.stringify(final_json);

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
        <div id="result_target"></div>
      </div>
    </main>
  );
};

export default pageWithAuthentication(Filescan);
