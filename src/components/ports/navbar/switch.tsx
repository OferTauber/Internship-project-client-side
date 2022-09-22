import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Stack, Typography } from '@mui/material/';
import DisplayModeEnum from '../../../DTOs_and_Enums/DisplayMode_enum';

export default function DisplaySwitch({
  displayMode,
  setDisplayMode,
}: {
  displayMode: DisplayModeEnum;
  setDisplayMode: React.Dispatch<React.SetStateAction<DisplayModeEnum>>;
}) {
  const handleChange = (): void => {
    const newMode =
      displayMode === DisplayModeEnum.map
        ? DisplayModeEnum.table
        : DisplayModeEnum.map;
    setDisplayMode(newMode);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>List</Typography>
      <Switch
        color="default"
        checked={displayMode === DisplayModeEnum.map}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Typography>Map</Typography>
    </Stack>
  );
}
