import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    color: "white",
  },
});

export const WhiteCircularBar = () => {
  const classes = useStyles();

  return (
    <CircularProgress
      classes={{
        root: classes.root,
      }}
      size={25} // Adjust the size to your desired value
      thickness={5} // Adjust the thickness of the progress bar
    />
  );
};
