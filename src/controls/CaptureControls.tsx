import React, { FC } from "react";
import { Checkbox, FormControlLabel, makeStyles, Slider, TextField, Typography } from '@material-ui/core';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useControlsContext } from ".";
import { MenuSection } from "../components";

const styles = makeStyles(() => ({
  checkboxLabel: {
    margin: 0,
    justifyContent: 'flex-end'
  }
}));

const CaptureControls: FC = () => {
  const classes = styles();
  const { captureControls: { update, state } } = useControlsContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    update(event.target.name, event.target.checked);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    update(event.target.name, event.target.value);
  };

  return (
    <MenuSection>
      <FormControlLabel
        className={classes.checkboxLabel}
        control={
          <Checkbox
            checked={state.captureEnabled}
            icon={<CameraAltOutlinedIcon fontSize="small" />}
            checkedIcon={<CameraAltIcon fontSize="small" />}
            name="captureEnabled"
            onChange={handleCheckboxChange}
          />
        }
        labelPlacement="start"
        label="Capture"
      />
      {
        state.captureEnabled &&
        <>
          <Typography variant="subtitle2">FPS</Typography>
          <Slider
            valueLabelDisplay="auto"
            value={state.fps}
            min={10}
            max={60}
            onChangeCommitted={(event, value) => update('fps', value as number)}
          />
          <Typography variant="subtitle2">Duration</Typography>
          <Slider
            valueLabelDisplay="auto"
            value={state.duration}
            min={1}
            max={25}
            onChangeCommitted={(event, value) => update('duration', value as number)}
          />
          <TextField
            name="filename"
            value={state.filename}
            placeholder="Filename"
            onChange={handleInputChange}
          />
        </>
      }
    </MenuSection>
  );
};

export default CaptureControls;
