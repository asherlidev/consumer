import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react';

import { MAP_STYLES } from './MapStyles';

/**
 * Merge & override default map options with any options provide from component props
 * @param {*} maps
 * @param {*} options
 */
export function getMapOptions(
  maps: GoogleMapReact.Maps,
  options?: (maps: GoogleMapReact.Maps) => GoogleMapReact.MapOptions
) {
  return options ? { ...defaultMapOptions(maps), ...options(maps) } : defaultMapOptions(maps);
}

/**
 * maps in google-map-react is equivalent to google.maps in Google Maps JavaScript API
 * @param {*} maps
 */
export function defaultMapOptions(maps: GoogleMapReact.Maps) {
  return {
    styles: MAP_STYLES,
    panControl: false,
    mapTypeControl: false,
    scrollwheel: false,
    fullscreenControl: true,
    zoomControl: true,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_BOTTOM,
      style: maps.ZoomControlStyle.SMALL,
    },
  };
}

export function getMapFitBounds(
  topLat: number,
  bottomLat: number,
  rightLng: number,
  leftLng: number,
  size: GoogleMapReact.Size
) {
  const bounds: GoogleMapReact.NESWBounds = {
    nw: { lat: topLat + 0.1, lng: leftLng - 0.1 },
    ne: { lat: topLat + 0.1, lng: rightLng + 0.1 },
    sw: { lat: bottomLat - 0.1, lng: leftLng - 0.1 },
    se: { lat: bottomLat - 0.1, lng: rightLng + 0.1 },
  };

  // const bounds = {
  //     ne: { lat: topLat + 0.1, lng: leftLng - 0.1 },
  //     sw: { lat: bottomLat - 0.1, lng: rightLng + 0.1 },
  // }

  return fitBounds(bounds, size);
}

type Coordinate = {
  lat: number;
  lng: number;
};

export function getMapTopLat(coordinates: Coordinate[]) {
  return coordinates.reduce((max, geo) => (geo.lat > max ? geo.lat : max), coordinates[0].lat);
}

export function getMapBottomLat(coordinates: Coordinate[]) {
  return coordinates.reduce((min, geo) => (geo.lat < min ? geo.lat : min), coordinates[0].lat);
}

export function getMapRightLng(coordinates: Coordinate[]) {
  return coordinates.reduce((max, geo) => (geo.lng > max ? geo.lng : max), coordinates[0].lng);
}

export function getMapLeftLng(coordinates: Coordinate[]) {
  return coordinates.reduce((min, geo) => (geo.lng < min ? geo.lng : min), coordinates[0].lng);
}

export function isMapSizeNew(currentSize: GoogleMapReact.Size, newSize: GoogleMapReact.Size) {
  const isNew = currentSize.width !== newSize.width || currentSize.height !== newSize.height;
  return isNew;
}
