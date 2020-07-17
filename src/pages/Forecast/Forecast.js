import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert} from 'reactstrap';
import ForecastPanel from './components/ForecastPanel';
import ForecastService from './../../services/ForecastService';
import emergencia from './../../static/img/emergencia.png';
import error from './../../static/img/error.png';
import informacion from './../../static/img/informacion.png';

const Forecast = () => {
    const [alertText, setAlertText] = useState("")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState("info")
    const [alertIcon, setAlertIcon] = useState(informacion)
    const [towns, setTowns] = useState([])
    const [quarters, setQuarters] = useState([])
    const [forecast, setForecast] = useState({})

    const getTowns = async () => {
        try {
            const { data } = await ForecastService.getTowns();
            setTowns(data);
        } catch(e) {
            handleError(e);
        }
    }

    const getQuarters = async () => {
        try {
            const { data } = await ForecastService.getQuarters();
            setQuarters(data);
        } catch(e) {
            handleError(e);
        }
    }

    const getForecast = async (param) => {
        try {
            const { data } = await ForecastService.getForecast(param);
            setForecast(data);
        } catch(e) {
            handleError(e);
        }
    }

    const handleForecast = () => {
        let type;
        let text;
        let icon;
        if(forecast.value < 0.1) {
            type = "info"
            text = "No hay probabilidad de inundacion, probabilidad: " + String(forecast.value*100)
            icon = informacion 
        } else if(forecast.value < 0.5) {
            type="warning"
            text="Probabilidad baja de inundación del " + String(forecast.value*100) + "%"
            icon=error
        } else {
            icon=emergencia
            type="danger"
            text="Probabilidad alta de inundación del " + String(forecast.value*100) + "%"
        }
        setAlertText(text)
        setAlertType(type)
        setAlertIcon(icon)
        setAlertOpen(true)
    }

    useEffect(() => {
        if(Object.entries(forecast).length) {
            handleForecast();
        }
    }, [forecast]);

    useEffect(()=>{
        getTowns();
        getQuarters();// eslint-disable-next-line
    }, []);

    const handleError = (e) => {
        setAlertText(String(e))
        setAlertType("danger")
        setAlertIcon(emergencia)
        setAlertOpen(true)
    }

    return(
        <Container fluid={true}>
            <Alert color={alertType}
            isOpen={alertOpen}
            toggle={()=>{setAlertOpen(!alertOpen)}}>
                <img src={alertIcon} alt="alertIcon"/>
                {alertText}
            </Alert>
             <Row xs="1" sm="2" md="2" lg="2">
                <Col md="4" lg="4">
                    <div>
                        <h4>Obtener pronóstico:</h4>
                        <ForecastPanel
                            towns={towns}
                            quarters={quarters}
                            forecast={forecast}
                            onRequest={getForecast}
                        />
                    </div>
                </Col>
                <Col md="4" lg="4">
                    <div>
                        <h4>Vialidades posiblemente afectadas:</h4>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Forecast;