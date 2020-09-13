import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Circle } from 'google-maps-react';
import floodicon from './../../../static/img/inundar.png';
import { Badge } from 'reactstrap';

const mapStyles = {
    width: '100%',
    height: '92%'
  };
  
  export const StreetMap = ({
      google,
      streets,
      quarter
  }) => {
      const [markers, setMarkers] = useState([]);
      const [circles, setCircles] = useState([]);
      const [activeMarker, setActiveMarker] = useState(null);
      const [isIwShown, setIsIwShown] = useState(false);
      const [detail, setDetail] = useState({});
      const [zoom, setZoom] = useState(14);
      const [center, setCenter] = useState({
          lat: 19.469148, 
          lng: -99.086716
        });
        
      const msg = ['Muy bajo', 'Bajo', 'Medio', 'Alto', 'Muy alto']
      const generateMarkers = () => {
          console.log(streets)
        let m = streets.map((s) => {
          return(
          <Marker
            name={s.nombre}
            position={{
              lat: s.latitud,
              lng: s.longitud
            }}
            icon={floodicon}
            id={s.id_calle}
            onClick={onMarkerClick}
          />);
        })
        setMarkers(m);
      }

      const generateCircles = () => {
        let c = streets.map((s) => {
          return(
            <Circle
                center={{
                  lat: Number(s.latitud),
                  lng: Number(s.longitud)
                }}
                radius={300}
                fillColor={"#ff0000"}
                strokeColor={"#ff0000"}/>
        )});
        console.log(c)
        setCircles(c);
      }
  
      const onMarkerClick = (props,marker,e) => {
        setActiveMarker(marker);
        setIsIwShown(true);
        let sl = streets.filter((s) => (
          s.id_calle === props.id
        ));
        setDetail(sl[0]);
      }
  
      const onCloseInfoWind = () => {
        setActiveMarker(null)
        setIsIwShown(false);
      }
  
      useEffect(() => {
          console.log(markers)
        generateCircles();
        generateMarkers();// eslint-disable-next-line
      }, [streets]);

      useEffect(() => {
        console.log(quarter)
        if(Object.entries(quarter).length > 0) {
            let c = {
              lat: quarter.latitud,
              lng: quarter.longitud
            }
            setCenter(c)
            setZoom(16)
          }// eslint-disable-next-line
      }, [quarter]);
      
      return (
          <Map
              google={google}
              zoom={zoom}
              style={mapStyles}
              initialCenter={center}
              center={center}
          >
              {markers}
              {circles}
              <InfoWindow
                marker={activeMarker}
                visible={isIwShown}
                onClose={onCloseInfoWind}
              >
                <div className="detail">
                  
                    <h6>{detail.nombre}</h6>
                    <h6>Intensidad:
                        <Badge color={detail.intensidad>3?"danger":"warning"}>
                          {msg[detail.intensidad - 1]}
                        </Badge>
                    </h6>
                </div>
              </InfoWindow>
          </Map>
      );
  }
  
  StreetMap.defaultProps = {
    streets: [],
    quarter: {}
  }
  
  const CustomMap = GoogleApiWrapper({
    apiKey: 'AIzaSyB-1e2lUaoS4Bnr4sG1iNMR810OozBfy3s'
  })(StreetMap);
  
  export default CustomMap;