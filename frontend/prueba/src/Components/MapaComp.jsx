import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-icon.png";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import SpeedReport from "./SpeedReport";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMap } from 'react-leaflet/hooks'
import Card from 'react-bootstrap/Card';

let iconUbicacion = new L.icon({
  iconUrl: icon,
  iconShadow: iconShadow,
  iconSize: [35, 35],
  iconAnchor: null,
  shadowAnchor: null,
});

const MapaComp = () => {
  const [datos, setDatos] = useState({});
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const socket = socketIOClient("http://127.0.0.1:5000/");
    socket.on("message", (data) => {
      setDatos(data);
      console.log(data);
      if (data.message) {
        toast(data.message);
        getData();
      }
    });
  }, []);

  const getData = async () => {
    const files = await axios.get("http://localhost:5000/location");
    setInfo(files.data);
  };

  const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [lat, lng]);
     return null;
   }

  return (
    <Row>
      <Col>
        <Toaster position="top-right" reverseOrder={false} />

        

<Card>
<Card.Body>
  <Card.Title>MAPA</Card.Title>
  {datos.lat !== undefined ? (
  <MapContainer
            center={[datos?.lat, datos?.long]}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[datos?.lat, datos?.long]} icon={iconUbicacion}>
              <Popup>
                <strong>{datos?.ficha}</strong>
                <br />
                <br />
                "lat": "{datos?.lat}",
                <br />
                "long": "{datos?.long}",
                <br />
                "speed": "{datos?.speed}",
                <br />
              </Popup>
            </Marker>
            <RecenterAutomatically lat={datos?.lat} lng={datos?.long} />
          </MapContainer>
        ) : (
          "Esperando datos..."
        )}

</Card.Body>
</Card>

    
      </Col>
      <Col>
      <Card>
      <Card.Body>
        <Card.Title>Reporte de limite de velocidad</Card.Title>
        {info.length > 0 && <SpeedReport info={info} />}
      </Card.Body>
    </Card>
    </Col>
      
    </Row>
  );
};

export default MapaComp;
