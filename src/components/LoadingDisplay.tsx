import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import { CenterBox } from "./CenterBox";

export const LoadingDisplay: React.FC<{text?: string}> = ({text}) => {
  return (
    <CenterBox>
      <CircularProgress size={150} thickness={1}/>
      {text && <Typography component="p" variant="body1" sx={{mt: 2}} color="primary">{text}</Typography>}
    </CenterBox>
  )
}