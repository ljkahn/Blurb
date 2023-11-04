import React from "react";
import BlurbStream from "./Blurbs/BlurbCard";
import BlurbCom from "./Blurbs/BlurbComCard";
import { GET_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";
import { useQuery } from "@apollo/client";

function CommentCom() {
  const { loading, data } = useQuery(GET_BLURB_BY_ID, {
    variables: { blurbId: "654676b83ac2a6d51c0ae1e9" }, // Replace with the actual blurb ID
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  // Check if data contains the expected structure
  if (!data || !data.blurbs) {
    return <p>Data is missing expected properties.</p>;
  }

  const blurb = data.blurbs; // Replace with the actual property name

  return (
    <div>
      <div>
        <BlurbStream
          key={blurb._id}
          blurbId={blurb._id}
          username={blurb.blurbAuthor.username}
          comments={blurb.comments}
        />
      </div>
      <div>
        <BlurbCom />
      </div>
    </div>
  );
}

export default CommentCom;

// import React from "react";
// import BlurbStream from "./Blurbs/BlurbCard";
// import BlurbCom from "./Blurbs/BlurbComCard";
// import { GET_BLURB_BY_ID } from "../utils/mutations/Blurb/BlurbMutations";
// import { useQuery } from "@apollo/client";
// function CommentCom() {
//   const { loading, data } = useQuery(GET_BLURB_BY_ID, {
//     variables: { blurbId: "65466205435d538f2c311bc8" }, // Replace with the actual blurb ID
//   });

//   console.log(data);

//   if (loading) {
//     return <p>Loading...</p>;
//   } // Assuming that the query returns a single blurb

//   return (
//     <div>
//       <div>
//         <BlurbStream
//           key={blurb._id}
//           blurbId={blurb._id}
//           username={blurb.blurbAuthor.username}
//           comments={blurb.comments}
//         />
//       </div>
//       <div>
//         <BlurbCom />
//       </div>
//     </div>
//   );
// }

// export default CommentCom;
