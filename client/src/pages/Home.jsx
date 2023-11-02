import React from 'react'
import Nav from "../components/NavBar.jsx";
import Header from "../components/Header.jsx";
import Profile from "../components/Profile/ProfilePhoto.jsx";
import Stream from "../components/Blurbs/BlurbCard.jsx";
import Com from "../components/Coments/Comlist.jsx";
import ComForm from "../components/Coments/ComForm.jsx";
import CommentCom from '../components/CommentCom.jsx';


function Home() {
  return (
    <div>
      <div>
       
        <Stream />
        <Nav />
      </div>
    </div>
  )
}

export default Home