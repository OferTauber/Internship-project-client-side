import { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { Map as ReactMapGl } from 'react-map-gl';
import './map.css';
import { INITIAL_VIEW_STATE__GLOBAL } from '../ports';
import IconClusterLayer from './icon-cluster-layer';
import iconMapping from './icons_sprites/location-icon-mapping';

const mapboxAccessToken = process.env.REACT_APP_MAP_BOX_TOKEN;

const MAP_VIEW = new MapView({ repeat: true });

export default function Map({
  portsData,
  updatedMapViewState,
  setDrawerPortId,
}) {
  const [mapViewState, setMapViewState] = useState(INITIAL_VIEW_STATE__GLOBAL);

  useEffect(() => {
    setMapViewState(updatedMapViewState);
  }, [updatedMapViewState]);

  const iconAtlas =
    'https://raw.githubusercontent.com/OferTauber/Applseeds/main/deck.gl/icon/icons_sprite/location-icon-atlas.png';

  const handelPortClick = (info, _) => {
    if (info.objects) return; // this means the clicked icon have more then 1 port in it
    setDrawerPortId(info.object.id);
  };

  const layerProps = {
    pickable: true,
    getPosition: (d) => d.coordinates,
    iconAtlas,
    iconMapping: iconMapping,
    id: 'ports-icon',
    data: portsData,
    sizeScale: 40,
    onClick: handelPortClick,
  };

  const portsLayer = new IconClusterLayer({
    ...layerProps,
  });

  return (
    <DeckGL
      layers={[portsLayer]}
      views={MAP_VIEW}
      initialViewState={mapViewState}
      controller={{ dragRotate: true }}
      getTooltip={(d) => {
        if (!d.object) return null;

        if (d.object.properties) {
          // = Point is a singel port
          return `Port name: ${d.object.properties.portname || 'unknown'}
            Port code: ${d.object.properties.code || 'unknown'}
            Country ${
              d.object.properties.country ||
              d.object.properties.iso3 ||
              d.object.properties.iso3_op ||
              'unknown'
            }`;
        } else {
          return d.object.point_count + ' ports';
        }
      }}
    >
      <ReactMapGl
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </DeckGL>
  );
}
