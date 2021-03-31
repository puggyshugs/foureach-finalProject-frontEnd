import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import css from './DemoMap.module.css';
import { attribution, tileUrl, defaultMapState } from "../utils/Utils";

import "leaflet/dist/leaflet.css";

function DemoMap() {
  const eventsList = ["music event", "cultural event"];

  const center = {
    lat: 52.477,
    lng: -1.899,
  };
  const [events, setEvents] = useState(eventsList);
  const [text, setText] = useState("");
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const [lat, setLat] = useState(center);
  const [long, setLong] = useState(center);
  const [address, setAddress] = useState("Move me!");
  const [road, setRoad] = useState("");
  const [postcode, setPostcode] = useState("");
  const markerRef = useRef(center);
  const eventHandlers = useMemo(
    (e) => ({
      dragend() {
        const marker = markerRef.current;
        console.log(markerRef.current);
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(marker.getLatLng());
          setLat(marker.getLatLng().lat);
          setLong(marker.getLatLng().lng);
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    async function getLocation() {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.address && data.address.postcode);
      if (
        data.address &&
        data.address.postcode &&
        data.address.postcode !== undefined
      ) {
        setPostcode(data.address && data.address.postcode);
        setRoad(data.address && data.address.road);
      } else setAddress("Move me!");
    }
    getLocation();
  }, [lat]); // create an events component and have a map with pins that are showing
  //different locations for different events

  function describeEvent(e) {
    setText(e.target.value);
  }

  function addEventToList(text) {
    const newEventsList = [...events, text];
    setEvents(newEventsList);
  }

  const full = [postcode, road, text];

  return (
    <div className={css.container} >
      <div className={css.map}>
        <MapContainer className={css.map}
          center={[defaultMapState.lat, defaultMapState.lng]}
          zoom={defaultMapState.zoom}
          style={{
            width: "50%",
            height: "40%",
            position: "absolute",
            top: 20,
            bottom: 20,
            left: 300,
            zIndex: 0,
          }}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          minZoom={defaultMapState.minZoom}
        >
          <TileLayer attribution={attribution} url={tileUrl} />
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}
          >
            <Popup minWidth={40}>
              <span onClick={toggleDraggable}>
                {draggable
                  ? `${postcode}
                  ${road}`
                  : "Click here to view postcode"}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className= {css.eventDetails}>
        <input className= {css.eventDetails} type="text" value={postcode} />
        <input className= {css.eventDetails} type="text" value={road} />
        <textarea class={css.autoExpand} rows='5' data-min-rows='3' autofocus onChange={(e) => describeEvent(e)} value={text}> </textarea>
        <button className={css.buttonEvent} onClick={() => addEventToList(full)}>Create Event</button>
        <ul>
          {events.map((item, index) => (
            <li key={index}>{item} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default DemoMap;
