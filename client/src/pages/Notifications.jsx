// import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// import { useSubscription } from "@apollo/client";
// import {
//   BLURB_LIKED_SUBSCRIPTION,
//   BLURB_COMMENTED_SUBSCRIPTION,
//   USER_FOLLOWED_SUBSCRIPTION,
// } from "../utils/Queries/queries";

// function Notifications({ blurbId, userId }) {
//   const BlurbLikesSubscription = ({ blurbId }) => {
//     const [likes, setLikes] = useState(0);
//     const { data, loading, error } = useSubscription(BLURB_LIKED_SUBSCRIPTION, {
//       variables: { blurbId },
//     });

//     useEffect(() => {
//       if (data && data.blurbLiked) {
//         setLikes(data.blurbLiked.likes);
//       }
//     }, [data]);

//     if (loading) return <p>Subscribing to likes...</p>;
//     if (error) return <p>Error in likes subscription: {error.message}</p>;

//     return <div>Likes: {likes}</div>;
//   };

//   BlurbLikesSubscription.propTypes = {
//     blurbId: PropTypes.string.isRequired,
//   };

//   const BlurbCommentsSubscription = ({ blurbId }) => {
//     const { data, loading, error } = useSubscription(
//       BLURB_COMMENTED_SUBSCRIPTION,
//       { variables: { blurbId } }
//     );

//     if (loading) return <p>Subscribing to comments...</p>;
//     if (error) return <p>Error in comments subscription: {error.message}</p>;

//     return <div>Comments: {data?.blurbCommented?.comments.length || 0}</div>;
//   };

//   BlurbCommentsSubscription.propTypes = {
//     blurbId: PropTypes.string.isRequired,
//   };

//   const UserFollowersSubscription = ({ userId }) => {
//     const { data, loading, error } = useSubscription(
//       USER_FOLLOWED_SUBSCRIPTION,
//       { variables: { userId } }
//     );

//     if (loading) return <p>Subscribing to followers...</p>;
//     if (error) return <p>Error in followers subscription: {error.message}</p>;

//     return <div>Followers: {data?.userFollowed?.followers.length || 0}</div>;
//   };

//   UserFollowersSubscription.propTypes = {
//     userId: PropTypes.string.isRequired,
//   };

//   return (
//     <div>
//       <BlurbLikesSubscription blurbId={blurbId} />
//       <BlurbCommentsSubscription blurbId={blurbId} />
//       <UserFollowersSubscription userId={userId} />
//     </div>
//   );
// }

// Notifications.propTypes = {
//   blurbId: PropTypes.string.isRequired,
//   userId: PropTypes.string.isRequired,
// };

// export default Notifications;

// import React, { useState, useEffect } from "react";
// import { useSubscription } from "@apollo/client";
// import {
//   BLURB_LIKED_SUBSCRIPTION,
//   BLURB_COMMENTED_SUBSCRIPTION,
//   USER_FOLLOWED_SUBSCRIPTION,
// } from "../utils/Queries/queries";

// function Notifications() {
//   const BlurbLikesSubscription = ({ blurbId }) => {
//     const [likes, setLikes] = useState(0);
//     const { data, loading, error } = useSubscription(BLURB_LIKED_SUBSCRIPTION, {
//       variables: { blurbId },
//     });

//     useEffect(() => {
//       if (data && data.blurbLiked) {
//         setLikes(data.blurbLiked.likes);
//       }
//     }, [data]);

//     if (loading) return <p>Subscribing to likes...</p>;
//     if (error) return <p>Error in subscription: {error.message}</p>;

//     return <div>Likes: {likes}</div>;
//   };

//   const BlurbCommentsSubscription = ({ blurbId }) => {
//     const { data, loading, error } = useSubscription(
//       BLURB_COMMENTED_SUBSCRIPTION,
//       { variables: { blurbId } }
//     );

//     if (loading) return <p>Subscribing to comments...</p>;
//     if (error) return <p>Error in subscription: {error.message}</p>;

//     return <div>Comments: {data?.blurbCommented?.comments.length || 0}</div>;
//   };

//   const UserFollowersSubscription = ({ userId }) => {
//     const { data, loading, error } = useSubscription(
//       USER_FOLLOWED_SUBSCRIPTION,
//       { variables: { userId } }
//     );

//     if (loading) return <p>Subscribing to followers...</p>;
//     if (error) return <p>Error in subscription: {error.message}</p>;

//     return <div>Followers: {data?.userFollowed?.followers.length || 0}</div>;
//   };

//   return (
//     <div>
//       <BlurbLikesSubscription blurbId={blurbId} />
//       <BlurbCommentsSubscription blurbId={blurbId} />
//       <UserFollowersSubscription userId={userId} />
//     </div>
//   );
// }

// export default Notifications;
import React from "react";

function Notifications() {
  return <div>Notifications</div>;
}

export default Notifications;
