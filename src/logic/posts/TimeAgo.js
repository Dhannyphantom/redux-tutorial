import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
  const date = parseISO(timestamp);
  const date_str = formatDistanceToNow(date);
  return (
    <span>
      &nbsp; <i>{date_str} ago</i>
    </span>
  );
};

export default TimeAgo;
