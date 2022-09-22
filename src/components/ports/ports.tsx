import Spinner from '../spinner/spinner';
import { useEffect, useState } from 'react';
import { getAllPorts } from '../../utils/ports_local_storage';
import Cookies from 'js-cookie';
import Map from './map/map';
import SearchAppBar from './navbar/navbar';
import MapViewStateDTO from '../../DTOs_and_Enums/MapViewStateDTO';
import DisplayModeEnum from '../../DTOs_and_Enums/DisplayMode_enum';
import FirstOrderPortDTO from '../../DTOs_and_Enums/FirstOrderPortDTO';
import List from './list/list';
import TemporaryDrawer from './drawer/drawer';

export const INITIAL_VIEW_STATE__GLOBAL: MapViewStateDTO = {
  longitude: 21.685,
  latitude: 27.96,
  zoom: 1,
  maxZoom: 20,
  pitch: 0,
  bearing: 0,
};
export default function Ports() {
  const [ports, setPorts] = useState<FirstOrderPortDTO[] | false>(false);
  const [displayMode, setDisplayMode] = useState(DisplayModeEnum.map);
  const [mapViewState, setMapViewState] = useState(INITIAL_VIEW_STATE__GLOBAL);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [drawerPortId, setDrawerPortId] = useState<string | false>(false);

  useEffect(() => {
    const getPorts = async () => {
      const token: string = Cookies.get('dockteck_token') || '';
      const data = await getAllPorts(token);

      if (isMounted) {
        setPorts(data);
      }
    };

    let isMounted = true;
    getPorts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!ports) return <Spinner />;

  return (
    <>
      <TemporaryDrawer
        drawerPortId={drawerPortId}
        setDrawerPortId={setDrawerPortId}
      />
      <SearchAppBar
        ports={ports}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
        setMapViewState={setMapViewState}
        setSearchBarValue={setSearchBarValue}
      />
      {displayMode === DisplayModeEnum.map ? (
        <Map
          portsData={ports}
          updatedMapViewState={mapViewState}
          setDrawerPortId={setDrawerPortId}
        />
      ) : (
        <List
          ports={ports}
          searchBarValue={searchBarValue}
          setDrawerPortId={setDrawerPortId}
        />
      )}
    </>
  );
}
