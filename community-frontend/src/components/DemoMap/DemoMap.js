import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from 'react';


import { attribution, tileUrl, defaultMapState } from "../utils/Utils";

import "leaflet/dist/leaflet.css";


function DemoMap() {



  const center = {
    lat: 52.47559,
    lng: -1.88383,
  }
    const[draggable, setDraggable] = useState(false)
    const[position, setPosition] = useState(center)
    const[myLat, setLat] = useState(null)
    const[myLng, setLng] = useState(null)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          console.log(markerRef.current);
          if (marker != null) {
            setPosition(marker.getLatLng())
            setLat(marker.getLatLng().lat);
            setLng(marker.getLatLng().lng);
          }
        },
      }),
      [],
    )

    console.log(myLat);
    console.log(myLng);

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

  return (
    <MapContainer
      center={[defaultMapState.lat, defaultMapState.lng]}
      zoom={defaultMapState.zoom}
      style={{
        width: "50%",
        height: "50%",
        position: "absolute",
        top: 20,
        bottom: 20,
        left: 200,
        zIndex: 20,
      }}
      updateWhenZooming={false}
      updateWhenIdle={true}
      preferCanvas={true}
      minZoom={defaultMapState.minZoom}
      
    >
    <TileLayer
      attribution={attribution}
      url={tileUrl}
    /> 
        <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={40}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
export default DemoMap;
