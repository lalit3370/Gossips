import { Box, Typography } from "@material-ui/core";
import React from "react";
function MsgComponent(props) {
  let temp = new Date(props.date);
  return (
    <Box padding={1} margin={2}>
      <Typography>{temp.toGMTString()}</Typography>
      <Typography varient="subtitle1">{props.content}</Typography>
    </Box>
  );
}

export default MsgComponent;
