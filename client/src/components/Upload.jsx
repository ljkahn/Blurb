import { useEffect, useRef, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function CloudinaryUploadWidget() {
  const [imageKey, setKey] = useState("");
  const [myImage, setImage] = useState(null);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmnfg3ids",
    },
  });
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dmnfg3ids",
        uploadPreset: "n5yblmgl",
      },
      function (error, result) {
        if (error) throw error;
        console.log(result);
        if (result.event === "success") {
          setKey(result.info.public_id);
          setImage(cld.image(result.info.public_id));
        }
      }
    );
  }, []);
  return ( 
    <>
  <h1>image key: {imageKey}</h1>
  <button onClick={() => widgetRef.current.open()}>Upload</button>
  {myImage && (
    <AdvancedImage
    style={{ maxWidth: "100%" }}
    cldImg={myImage}
    plugins={[responsive(), placeholder()]}
    />
  )}
  </>
  );
}
