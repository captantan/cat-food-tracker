import { Icon, Button, Typography } from "@mui/material";
import React from "react";
import { CenterBox } from "./CenterBox";

export const ErrorDisplay: React.FC<{title?: string, body?: string, errorCode: number | null, onClick: () => void}> = (props) => {
  const title = props.title || 'An Error Occurred';

  return (
    <CenterBox>
      <Icon color="primary" fontSize="large" sx={{mb: 1}}>sad_tab</Icon>
      <Typography variant="h6" component="h2" gutterBottom={false}>{title}</Typography>
      {props.body && <Typography variant="caption" component="p" gutterBottom={false}>{props.body}</Typography>}
      <pre style={{marginTop: 0}}>Error Code: {props.errorCode}</pre>

      <Button onClick={props.onClick}>Retry</Button>
    </CenterBox>
  )
}