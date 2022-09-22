import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MapViewStateDTO from '../../../DTOs_and_Enums/MapViewStateDTO';
import FirstOrderPortDTO from '../../../DTOs_and_Enums/FirstOrderPortDTO';

export default function Search({
  ports,
  setMapViewState,
  setSearchBarValue,
}: {
  ports: FirstOrderPortDTO[];
  setMapViewState: React.Dispatch<React.SetStateAction<MapViewStateDTO>>;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [enableSearch, setEnableSearch] = useState(false);

  useEffect(() => setEnableSearch(Array.isArray(ports)), [ports]);

  const [portsForSelect, setPortsForSelect] =
    useState<FirstOrderPortDTO[]>(INIT_DUMMY_VALUE);
  let count = 0;

  useEffect(() => {
    setPortsForSelect(ports);
  }, [ports]);

  const handelPortSelection = (port: any) => {
    if (!port?.geometry) return;

    const params = {
      maxZoom: 20,
      pitch: 0,
      bearing: 0,
      zoom: 9,
      longitude: port.geometry.coordinates[0],
      latitude: port?.geometry.coordinates[1],
    };
    setMapViewState({
      ...params,
    });
  };

  const handesSerchbarChange = (e: any): void => {
    setSearchBarValue(e.target.value.toLowerCase());
  };

  const getPortLable = (port: any): string => {
    const props = port.properties;
    return `${props.code || 'Unknown code #' + count++}, ${props.portname} (${
      props.iso3 || props.iso3_op || props.country || 'unknown country'
    })`;
  };

  return (
    <Autocomplete
      disabled={!enableSearch}
      disablePortal
      id="Port-name-select"
      options={portsForSelect}
      getOptionLabel={(option: any) => getPortLable(option)}
      sx={{ width: 300 }}
      onChange={(_, value) => handelPortSelection(value)}
      onSelect={(e) => handesSerchbarChange(e)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={enableSearch ? 'Select port name' : 'Loading...'}
          />
        );
      }}
    />
  );
}

const INIT_DUMMY_VALUE: FirstOrderPortDTO[] = [
  {
    geometry: {
      type: 'dummy',
      coordinates: [0, 0],
    },
    id: 'dummy',
    geometry_name: 'dummy',
    type: 'dummy',
    properties: {
      portname: 'dummy',
      country: 'dummy',
      iso3_op: 'dummy',
      code: 'dummy',
      iso3: 'dummy',
      isDockTechPartner: false,
    },
  },
];
