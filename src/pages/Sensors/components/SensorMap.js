import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import sensoricon from './../../../static/img/sensor-icon.png';
import { Badge } from 'reactstrap';
//import PropTypes from 'prop-types';

const mapStyles = {
  width: '100%',
  height: '92%'
};

export const SensorMap = (props) => {
    const {
      sensors,
      selected,
      detail,
      onDetail
    } = props;

    const [markers, setMarkers] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [isIwShown, setIsIwShown] = useState(false);
    const [zoom, setZoom] = useState(14);
    const [center, setCenter] = useState({
        lat: 19.469148, 
        lng: -99.086716
      });

    const generateMarkers = () => {
      let m = sensors.map((s) => {
        return(
        <Marker
          name={s.id_sensor}
          position={{
            lat: s.latitud,
            lng: s.longitud
          }}
          icon={sensoricon}
          id={s.id_sensor}
          onClick={onMarkerClick}
        />);
      })
      setMarkers(m);
    }

    const onMarkerClick = (props,marker,e) => {
      setActiveMarker(marker);
      setIsIwShown(true);
      let sl = sensors.filter((s) => (
        s.id_sensor === props.id
      ));
      onDetail(sl[0]);
    }

    const onSelectedChange = () => {
        if(Object.entries(selected).length > 0) {
          let c = {
            lat: selected.latitud,
            lng: selected.longitud
          }
          setCenter(c)
          setZoom(17)
        }
    }

    const onCloseInfoWind = () => {
      setActiveMarker(null)
      setIsIwShown(false);
    }

    useEffect(() => {
      generateMarkers();// eslint-disable-next-line
    }, [props.sensors]);

    useEffect(() => {
      onSelectedChange();// eslint-disable-next-line
    }, [props.selected]);

    return (
        <Map
            google={props.google}
            zoom={zoom}
            style={mapStyles}
            initialCenter={center}
            center={center}
        >
            {markers}
            <InfoWindow
              marker={activeMarker}
              visible={isIwShown}
              onClose={onCloseInfoWind}
            >
              <div className="detail">
                
                  <h6><Badge color="primary">{"Id: "}</Badge>
                      <Badge color="secondary">{detail.id_sensor}</Badge>
                  </h6>
                  <h6><Badge color="primary">{"Lat: "}</Badge>
                      <Badge color="secondary">{detail.latitud}</Badge>
                  </h6>
                  <h6><Badge color="primary">{"Long: "}</Badge>
                      <Badge color="secondary">{detail.longitud}</Badge>
                  </h6>
                  <h6><Badge color="primary">{"Nivel: "}</Badge>
                      <Badge color="secondary">{detail.nivel_agua + "cm"}</Badge>
                  </h6>
                  <h6><Badge color="primary">{"Actualizado: "}</Badge>
                      <Badge color="secondary">{detail.creado}</Badge>
                  </h6>
              </div>
            </InfoWindow>
        </Map>
    );
}

SensorMap.defaultProps = {
  sensors: [],
  selected: {},
  detail: {}
}

const CustomMap = GoogleApiWrapper({
  apiKey: 'AIzaSyB-1e2lUaoS4Bnr4sG1iNMR810OozBfy3s'
})(SensorMap);

export default CustomMap;