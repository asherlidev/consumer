import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import {
  getMapOptions,
  getMapFitBounds,
  getMapTopLat,
  getMapBottomLat,
  getMapRightLng,
  getMapLeftLng,
  isMapSizeNew,
} from './MapHelpers';

type MapProps = {
  options?: (maps: GoogleMapReact.Maps) => GoogleMapReact.MapOptions;
  markers: { lat: number; lng: number }[];
  children?: React.ReactNode;
};

const Map: React.FC<MapProps> = ({ options, markers, children }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 37.0902, lng: -95.7129 }); // United States' geolocation
  const [mapZoom, setMapZoom] = useState(17);
  const [mapSize, setMapSize] = useState<GoogleMapReact.Size>({
    width: 0,
    height: 0,
  });
  const [topLat, setTopLat] = useState(0);
  const [bottomLat, setBottomLat] = useState(0);
  const [rightLng, setRightLng] = useState(0);
  const [leftLng, setLeftLng] = useState(0);

  useEffect(() => {
    if (markers.length > 0) {
      setTopLat(getMapTopLat(markers));
      setBottomLat(getMapBottomLat(markers));
      setRightLng(getMapRightLng(markers));
      setLeftLng(getMapLeftLng(markers));
    }
  }, [markers]);

  useEffect(() => {
    if (topLat && bottomLat && rightLng && leftLng && Object.keys(mapSize).length > 0) {
      const fitBounds = getMapFitBounds(topLat, bottomLat, rightLng, leftLng, mapSize);
      setMapCenter(fitBounds.center);
      setMapZoom(fitBounds.zoom);
    }
  }, [topLat, bottomLat, rightLng, leftLng, mapSize]);

  const handleMapChange = (map: GoogleMapReact.ChangeEventValue) => {
    setMapCenter(map.center);
    setMapZoom(map.zoom);
    if (isMapSizeNew(mapSize, map.size)) {
      setMapSize(map.size);
    }
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.GATSBY_GCP_KEY || 'AIzaSyAw92gEpMXS680pZOYeN5acN6HM6zcHPAs',
      }}
      center={mapCenter}
      zoom={mapZoom}
      options={(maps) => getMapOptions(maps, options)}
      onChange={handleMapChange}
    >
      {children}
    </GoogleMapReact>
  );
};

export default Map;
