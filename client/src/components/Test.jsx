import React ,{useState}from 'react'
import CloudinaryUploadWidget from './Upload';
import { Cloudinary } from "@cloudinary/url-gen";

function Test() {

  const [cloudName] = useState("dmnfg3ids");
  const [uploadPreset] = useState("aoh4fpwm");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset});

    const cld = new Cloudinary({
      cloud: {
        cloudName
      }
    });
  return (
    <div>Test
      <CloudinaryUploadWidget/>

    </div>
  )
}

export default Test