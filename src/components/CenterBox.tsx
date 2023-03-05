import { Box } from "@mui/material";
import React from "react";

export const CenterBox: React.FC<{children: React.ReactNode[]}> = ({children}) => (
  <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: '1 0 auto'}}>
    {children}
  </Box>
)