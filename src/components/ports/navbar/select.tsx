import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MapViewStateDTO from '../../../DTOs_and_Enums/MapViewStateDTO';

export default function Search({
  ports,
  setMapViewState,
}: {
  ports: any;
  setMapViewState: React.Dispatch<React.SetStateAction<MapViewStateDTO>>;
}) {
  const INIT_DUMMY_VALUE = [
    {
      geometry: null,
      id: '1',
      properties: {
        portname: '',
      },
    },
  ];
  const [portsForSelect, setPortsForSelect] = useState(INIT_DUMMY_VALUE);
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

  const getPortLable = (port: any): string => {
    const props = port.properties;
    try {
      return `${props.code || 'Unknown code #' + count++}, ${props.portname} (${
        props.iso3 || props.iso3_op || props.country || 'unknown country'
      })`;
    } catch (e) {
      return 'Unknown ' + Math.floor(Math.random() * 100);
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="Port-name-select"
      options={portsForSelect}
      getOptionLabel={(option: any) => getPortLable(option)}
      sx={{ width: 300 }}
      onChange={(_, value) => handelPortSelection(value)}
      renderInput={(params) => {
        return <TextField {...params} label="Select port name" />;
      }}
    />
  );
}
