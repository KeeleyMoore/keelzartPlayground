import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { useControlsContext } from '.';

const CaptureAnimation: FC = () => {
  const { captureControls: { startRecording, captureEnabled } } = useControlsContext();

  return captureEnabled ? (
    <Box position="absolute" bottom={0} right={0}>
      <Button onClick={startRecording} color="secondary">
        Record
      </Button>
    </Box>
  ) : null;
};

export default CaptureAnimation;
