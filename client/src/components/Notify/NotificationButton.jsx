import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GET_NOTIFICATIONS } from "../../utils/Queries/userQueries";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";

function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

const NotificationButton = () => {
  const { loading, error, data } = useQuery(QUERY_GET_NOTIFICATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("Notify Button", data.notify.notifications);

  // const notificationsCount = data.me?.notifications?.length || 0;
  const notificationsCount = data.notify?.notifications?.length || 0;

  const yellow = "#F7E258";
  const lightGray = "#BEBFC5";

  const editStyle = {
    isActive: yellow,
    notActive: lightGray,
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <IconButton aria-label={notificationsLabel(notificationsCount)}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={notificationsCount}
          color="secondary"
        >
          <FavoriteIcon
            style={{ fill: isActive("/Likes") ? yellow : lightGray }}
            sx={{ fontSize: 40 }}
          />
        </Badge>
      </IconButton>
    </div>
  );
};

export default NotificationButton;
