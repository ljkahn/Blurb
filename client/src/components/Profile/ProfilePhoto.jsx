import React, {useState, useEffect} from 'react'

const sample = 'cld-sample-5'
const cloudName = 'dmnfg3ids';

function ProfilePhoto({profileImg}) {
  const [staticImg, setStaticImg] = useState(`https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${sample}.png` );
  useEffect(() => {
    if (profileImg) {
      setStaticImg(`https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${profileImg}.png`)
      
    }
  }, [profileImg])
  // const imgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${staticImg}.png`
  return (
    <div>
      <img id='profilePic' src={staticImg} alt="ProfilePhoto" />
    </div>
  )
}

export default ProfilePhoto

