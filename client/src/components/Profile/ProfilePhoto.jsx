import React from 'react'

function ProfilePhoto() {
  const staticImg = 'rpwvrgjpihgzqblfwhe7';
  const cloudName = 'dmnfg3ids';
  const imgUrl = `https://res.cloudinary.com/${cloudName}/image/upload/t_custom-resize/${staticImg}.png`
  return (
    <div>
      <img id='profilePic' src={imgUrl} alt="ProfilePhoto" />
    </div>
  )
}

export default ProfilePhoto

//const static key = public key from cloudinary 
//test component to see if image comes up 