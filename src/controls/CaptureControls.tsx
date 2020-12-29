import React, { FC } from "react";
import { Box, Typography } from '@material-ui/core';

const CaptureControls: FC = () => {

  return (
    <Box mx={3} my={1} display="flex" flexDirection="column">
      <Typography gutterBottom>Capture</Typography>
    </Box>
  );
};

export default CaptureControls;
