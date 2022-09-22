import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import FirstOrderPortDTO from '../../../DTOs_and_Enums/FirstOrderPortDTO';
import ShallowPortObject from '../../../DTOs_and_Enums/ShallowPortObjectClass';
import useWindowHeight from '../../../utils/useWindowHeightHook';
import filterShalowPorts from './filterShallowPorts';

const columns: GridColDef[] = [
  { field: 'code', headerName: 'Port Code', width: 160 },
  { field: 'portname', headerName: 'Port name', width: 150 },
  { field: 'country', headerName: 'Country', width: 80 },
  {
    field: 'isDockTechPartner',
    headerName: 'DockTech Partner',
    type: 'boolean',
    width: 150,
  },
];

export default function List({
  ports,
  searchBarValue,
  setDrawerPortId,
}: {
  ports: FirstOrderPortDTO[];
  searchBarValue: string;
  setDrawerPortId: React.Dispatch<React.SetStateAction<string | false>>;
}) {
  const [shallowPorts, setShallowPorts] = useState<ShallowPortObject[]>([]);
  const [filterdShallowPorts, setFilterdShallowPorts] = useState(shallowPorts);

  useEffect(() => {
    const shallowPorts = ports.map((portObject) =>
      convertPortObjectToShallow(portObject)
    );

    setShallowPorts(shallowPorts);
  }, [ports]);

  useEffect(() => {
    if (searchBarValue) {
      setFilterdShallowPorts(filterShalowPorts(searchBarValue, shallowPorts));
    } else {
      setFilterdShallowPorts(shallowPorts);
    }
  });

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setDrawerPortId(params.row.id);
  };

  return (
    <div
      id={'list-wrapper'}
      style={{ width: '100%', height: calcListHeight(useWindowHeight()) }}
    >
      <DataGrid
        onRowClick={handleRowClick}
        rows={filterdShallowPorts}
        columns={columns}
        pageSize={calcNumOfLines(useWindowHeight())}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}

let count = 0;

const convertPortObjectToShallow = (
  port: FirstOrderPortDTO
): ShallowPortObject => {
  const props = port.properties;
  const shallowObject: ShallowPortObject = {
    code: props.code || 'Unknown code #' + count++,

    portname: props.portname || '',

    country: props.iso3 || props.iso3_op || props.country || 'unknown country',

    isDockTechPartner: !!props.isDockTechPartner,

    id: port.id,
  };
  return shallowObject;
};

const calcListHeight = (windowHeight: number): number => {
  const navBarHeight = 70;
  return windowHeight - navBarHeight;
};

const calcNumOfLines = (windowHeight: number): number => {
  const margin = 140;
  const lineHeight = 52;
  return Math.floor((windowHeight - margin) / lineHeight) - 1;
};
