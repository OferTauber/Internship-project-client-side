import { FlyToInterpolator } from 'deck.gl/typed';

declare class MapViewStateDTO {
  longitude: number;
  latitude: number;
  zoom: number;
  maxZoom: number;
  pitch: number;
  bearing: number;
  transitionDuration?: number;
  transitionInterpolator?: FlyToInterpolator;
}

MapViewStateDTO.prototype.transitionInterpolator = new FlyToInterpolator();

export default MapViewStateDTO;
