
import { 
  MapContainer, 
  TileLayer, 
 
} from "react-leaflet";
import {
  attribution,
  tileUrl,
  defaultMapState,
  
} from '../utils/Utils';

import "leaflet/dist/leaflet.css";


function DemoMap(){
   
        return (
        <MapContainer
            center={[defaultMapState.lat, defaultMapState.lng]}
            zoom={defaultMapState.zoom}
            style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: 500, }}
            updateWhenZooming={false}
            updateWhenIdle={true}
            preferCanvas={true}
            minZoom={defaultMapState.minZoom}
        >
            <TileLayer
                attribution={attribution}
                url={tileUrl}
            />
        </MapContainer>
        ) 
    }
export default DemoMap;