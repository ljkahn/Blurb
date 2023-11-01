const axios = require ('axios');
require('dotenv').config();
const {readFileSync } = require('fs');

// console.log(process.env);
const testFile = readFileSync('./testImg.png');
// console.log(testFile);


const upload = async (image) => {
  const data = new FormData();
  data.append("file", image );
  data.append(
    "upload_preset", "blurbImages" 
  );
  console.log(data);
  try {
    let resourceType = "image" ;
    let api = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/${resourceType}/upload`;

    const authHeaders = {
      Authorization: `Basic ${btoa(`${process.env.API_KEY}:${process.env.API_SECRET}`)}`,
    };

    const res = await axios.post(api, data, 
      // { headers: authHeaders } 
      );
    console.log(res.data);
    // const { secure_url } = res.data;
    // console.log(secure_url);
    // return secure_url;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

upload(testFile);