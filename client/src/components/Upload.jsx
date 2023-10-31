import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
// require('dotenv').config();
import { Cloudinary } from "@cloudinary/url-gen";

const Upload = () => {
  const [img, setImg] = useState(null);
  // const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "blurbImages" : "videos_preset"
    );

    const cloudName = "dmnfg3ids";
    const apiKey = "242489771176633";
     const apiSecret = "U7lyJPJeIM9AWzhyrgN0CV_xBFc";

    try {
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const authHeaders = {
        Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
      };

      const res = await axios.post(api, data, { headers: authHeaders });
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Upload image file
      const imgUrl = await uploadFile("image");

      // // Upload video file
      // const videoUrl = await uploadFile('video');

      // Send backend api request
      const REACT_APP_BACKEND_BASEURL = 'http://localhost:3000'
      await axios.post(`${REACT_APP_BACKEND_BASEURL}/api/videos`, {
        imgUrl,
        //  videoUrl
      });

      // Reset states
      setImg(null);
      // setVideo(null);

      console.log("File upload success!");
      setLoading(false);
      // navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div> */}
        <br />
        <div>
          <label htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </div>
  );
};

export default Upload;
