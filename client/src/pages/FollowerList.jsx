// import React, { useState, useEffect } from "react";
// import FollowersListCom from "../components/Follow/FollowersListCom";
// import { useQuery } from "@apollo/client";
// import { GET_FOLLOWERS } from "../utils/Queries/userQueries";
// import { useParams } from "react-router-dom";

// function Followers() {
//   const [followers, setFollowers] = useState([]);
//   const { userId } = useParams();
//   const { loading, error, data, refetch } = useQuery(GET_FOLLOWERS, {
//     variables: {
//       userId: "655515e9b2067d82bb5e5738",
//     },
//   });

//   // Use refetch to force a fresh fetch
//   refetch();

//   // useEffect(() => {
//   //   if (data) {
//   //     console.log("Data:", data);
//   //     setFollowers(data.followers);
//   //   }
//   // }, [data]);

//   useEffect(() => {
//     if (data && data.userFollowers) {
//       console.log("Data:", data.userFollowers); // Log the data to see its structure
//       setFollowers(data.userFollowers);
//     }
//   }, [data]);
//   if (loading) {
//     return <p>Loading followers...</p>;
//   }

//   if (error) {
//     console.error("Error fetching followers data:", error);
//     return <p>Error fetching followers data</p>;
//   }

//   return (
//     <div>
//       <h1>Followers Page</h1>
//       {followers.length > 0 && (
//         <FollowersListCom
//           followersList={followers}
//           onClose={() => setFollowers([])}
//         />
//       )}
//     </div>
//   );
// }

// export default Followers;

import React, { useState, useEffect } from "react";
import FollowersListCom from "../components/Follow/FollowersListCom";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../utils/Queries/userQueries";
import { useParams } from "react-router-dom";

function Followers() {
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_FOLLOWERS, {
    variables: {
      userId: userId, // Use the userId from the route parameters
    },
  });

  // Use refetch to force a fresh fetch
  refetch();

  useEffect(() => {
    if (data && data.userFollowers) {
      console.log("Data:", data.userFollowers);
      setFollowers(data.userFollowers);
    }
  }, [data]);

  if (loading) {
    return <p>Loading followers...</p>;
  }

  if (error) {
    console.error("Error fetching followers data:", error);
    return <p>Error fetching followers data</p>;
  }

  return (
    <div>
      <h1>Followers Page</h1>
      {followers.length > 0 && (
        <FollowersListCom
          followersList={followers}
          onClose={() => setFollowers([])}
        />
      )}
    </div>
  );
}

export default Followers;
