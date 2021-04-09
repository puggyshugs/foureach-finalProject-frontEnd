
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import css from "./DemoMap.module.css";
import { attribution, tileUrl, defaultMapState } from "../utils/Utils";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { MDBInput } from "mdbreact";

function DemoMap() {
  const eventsList = [
    [
      ["CV8 1QJ"],
      ["Abbey End Car Park"],
      [
        "5-week Beginners photography course on 18th April 2020 at 18:00-Everything to get off Automatic mode and learn how to be more creative with Composition and Camera",
      ],
    ],
    [
      ["CV34 7NV"],
      ["Ashley Main Road"],
      [
        "Street dance performance  on 24th April 2020 at 14:00 - Pick your favorite trainers and come with a high energy to learn basic steps and movements.",
      ],
    ],
  ];

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
    const newEventsList = [text, ...events];
    setEvents(newEventsList);
  }

  const full = [postcode, road, text];

  return (
    <div className={css.main}>
      <div className={css.container}>
        <div className={css.map}>
          <MapContainer
            className={css.map}
            center={[defaultMapState.lat, defaultMapState.lng]}
            zoom={defaultMapState.zoom}
            style={{
              width: "40%",
              height: "40%",
              border: "solid   rgb(0, 95, 150)",
              borderRadius: "25px",
              position: "absolute",
              top: 300,
              bottom: 20,
              left: 850,
              zIndex: 0,
            }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={defaultMapState.minZoom}
          >
            <TileLayer attribution={attribution} url={tileUrl} />
            <Marker
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [13, 11],
                })
              }
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
        <div className={css.eventsDetailsContainer}>
        <div className={css.eventDetails}>
          <input
            className={css.eventDetailsInput}
            type="text"
            value={postcode}
            placeholder="Postcode of the event..."
          />
          <input
            className={css.eventDetailsInput}
            type="text"
            value={road}
            placeholder="Address of the event..."
          />
          <MDBInput
            className={css.inputField}
            type="textarea"
            label="Type details about event..."
            rows="4"
            icon="pencil-alt"
            onChange={(e) => describeEvent(e)}
          />
          <button
            className={css.buttonEvent}
            onClick={() => addEventToList(full)}
          >
            Create Event
          </button>
          <div className={css.scroll}>
            {events.map((item, index) => (
              <div className={css.cardEvent}>
                <p className={css.cardEventAddress}key={index}>
                  Address: {item[0]} {item[1]}
                </p>
                <p className={css.cardEventDetails} key={index}>Details: {item[2]}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DemoMap;
