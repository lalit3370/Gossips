import { Box, Typography, useTheme } from "@material-ui/core";
import "fontsource-roboto";
import React from "react";
import Asynchronous from "../components/SearchAutoComplete";
export default function Home() {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="row"
      bgcolor={theme.palette.background.default}
      justifyContent="center"
      alignItems="center"
      flex={1}
      height="100vh"
    >
      <Box>
        <Typography color="textPrimary" variant="h3">
          Gossips
        </Typography>
        <Asynchronous />
      </Box>
    </Box>
  );
}
