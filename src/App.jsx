import { useState } from "react";
import { useRef } from "react"

export default function ReactApp() {
  console.log('ReactApp rendered');
  const [msg, setMsg] = useState([]);
  const [files, setFiles] = useState(null);
  const uploadRef = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    console.log('handleClick uploadRef:', uploadRef.current);
    uploadRef.current.click();
  };
  async function handleChange(e) {
    console.log('handleChange triggered, files:', e.target.files)
    setFiles(e.target.files);
    const uploadedFiles = e.target.files;
    const multipartFormdataBody = new FormData();
    for (let i = 0; i < uploadedFiles.length; i++) {
      multipartFormdataBody.append('pics', uploadedFiles[i]);
    };
    const response = await fetch('https://c3v4f9o49b.execute-api.us-east-2.amazonaws.com/run', { method: 'POST', body: multipartFormdataBody });
    const result = await response.json();
    setMsg(result.findings);
  };
  return (
    <>
      <div style={{
        display: 'flex', fontSize: '2rem', width: '100vw', justifyContent: 'center',
        alignItems: 'center'
      }}>
        <img src="yellowfinger.png"
          style={{
            height: '2em'
          }}
        />
        <h1 style={{ fontSize: 'inherit' }}>Middle Finger Detector</h1>
      </ div>
      <div style={{
        display: 'flex', fontSize: '2rem', width: '100vw', justifyContent: 'center',
        alignItems: 'center'
      }}>
        <button type="button" style={{ fontSize: '0.4em' }} onClick={handleClick}>Upload Picture(s) and Run Detector</button>
        <input type="file" multiple onChange={handleChange} ref={uploadRef} style={{ display: 'none' }} ></input>
      </div>
      <div style={{
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        display: msg.length > 0 ? 'flex' : 'none'
      }}>
        <h4>Detection results:</h4>
        <ul>
          {msg.map((item, idx) => {
            return <li key={idx}>{item}</li>
          })}
        </ul>
      </div>
    </>
  );
};

