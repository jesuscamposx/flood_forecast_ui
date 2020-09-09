import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert} from 'reactstrap';
import SERVICE_ENDPOINTS from './../../services/ServicesEndpoints';
import SensorService from './../../services/SensorService';
import MeasureService from './../../services/MeasureService';
import FileService from './../../services/FileService';
import SensorsList from './components/SensorsList';
import SensorMap from './components/SensorMap';
import DownloadPanel from './components/DownloadPanel';
const Sensors = () => {

    const [sensorList, setSensorList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [detail, setDetail] = useState({});
    const [catalogueF, setCatalogueF] = useState([]);
    const [catalogueM, setCatalogueM] =useState([]);
    const [alertText, setAlertText] = useState("")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState("info")

    const getList = async () => {
        try {
            let { data } =  await SensorService.getSensorList();
            setSensorList(data);
        } catch(e) {
            handleError(e)
        }
    }

    const getFloodCatalogue = async () => {
        try {
            let { data } =  await FileService.getFloodCatalogue();
            setCatalogueF(data.catalogo);
        } catch(e) {
            handleError(e)
        }
    }

    const getMeasureCatalogue = async () => {
        try {
            let { data } =  await FileService.getMeasureCatalogue();
            setCatalogueM(data.catalogo);
        } catch(e) {
            handleError(e)
        }
    }

    const handleError = (e) => {
        setAlertText(String(e))
        setAlertType("danger")
        setAlertOpen(true)
    }

    useEffect(() => {
        getList();
        getFloodCatalogue();
        getMeasureCatalogue();// eslint-disable-next-line
    }, []);

    const onClick = (s) => {
        setSelected(s[0]);
    }

    const onDetail = async (sensor) => {
        try{
            let { data } = await MeasureService.getLastValue(sensor.id_sensor);
            setDetail({ ...sensor, ...data });
        } catch(e) {
            handleError(e);
        }
    }

    const downloadFloods = (years) => {
        window.location.href = SERVICE_ENDPOINTS.GET_FLOOD_FILE + years;
    }

    const downloadMeasures = (years) => {
        window.location.href = SERVICE_ENDPOINTS.GET_MEASURES_FILE + years;
    }

    return(
        <Container fluid={true}>
            <Alert color={alertType}
            isOpen={alertOpen}
            toggle={()=>{setAlertOpen(!alertOpen)}}>
                {alertText}
            </Alert>
             <Row xs="1" sm="2" md="3" lg="3">
                <Col>
                    <h4>Sensores</h4>
                    <SensorsList
                        sensors={sensorList}
                        onClick={onClick}
                    />
                </Col>
                <Col>
                    <h4>Locations</h4>
                    <SensorMap
                        sensors = { sensorList }
                        selected = { selected }
                        detail = { detail }
                        onDetail = { onDetail }
                    />
                </Col>
                <Col>
                    <DownloadPanel
                        title="Descargar registro de inundaciones reportadas"
                        subtitle="Años disponibles:"
                        catalogue={ catalogueF }
                        doDownload={ downloadFloods }
                    />
                    <DownloadPanel
                        title="Descargar registro de nivel de agua"
                        subtitle="Años disponibles:"
                        catalogue={ catalogueM }
                        doDownload={ downloadMeasures }
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Sensors;