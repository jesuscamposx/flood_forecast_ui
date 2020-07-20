import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ForecastPanel from './components/ForecastPanel';
import StreetMap from './components/StreetMap';
import RegisterForm from './components/RegisterForm';
import ForecastService from './../../services/ForecastService';
import AlertService from './../../services/AlertService';
import emergencia from './../../static/img/emergencia.png';
import error from './../../static/img/error.png';
import informacion from './../../static/img/informacion.png';

const Forecast = () => {
    const [alertText, setAlertText] = useState("")
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState("info")
    const [alertFText, setAlertFText] = useState("")
    const [alertFOpen, setAlertFOpen] = useState(false)
    const [alertFType, setAlertFType] = useState("info")
    const [alertFIcon, setAlertFIcon] = useState(informacion)
    const [towns, setTowns] = useState([])
    const [quarters, setQuarters] = useState([])
    const [streets, setSteets] = useState([])
    const [quarter, setQuarter] = useState({})
    const [forecast, setForecast] = useState({})
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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

    const getForecast = async (quarter, date) => {
        let qa = quarters.filter((q) => (String(q.id_colonia)===String(quarter)));
        console.log(quarters)
        console.log(quarter)
        console.log(qa);
        setQuarter(qa[0])
        try {
            let param = "colonia="+quarter+"&fecha="+date;
            const { data } = await ForecastService.getForecast(param);
            getStreets(quarter, data.inundacion)
            setForecast(data);
        } catch(e) {
            handleError(e);
        }
    }

    const getStreets = async (quarter, flood) => {
        console.log(quarter)
        console.log(flood)
        if(flood) {
            const {data} = await ForecastService.getStreets(quarter);
            console.log(data)
            setSteets(data);
        } else {
            setSteets([]);
        }
    }

    const handleForecast = () => {
        let type;
        let text;
        let icon;
        if(forecast.value <= 0.5) {
            type = "info"
            text = "Poca probabilidad de inundación (" + String(Math.round(forecast.value*100)) + ")"
            icon = informacion 
        } else if(forecast.value > 0.5 && forecast <= 0.6) {
            type="warning"
            text="Probabilidad baja de inundación (" + String(Math.round(forecast.value*100)) + ")"
            icon=error
        } else if(forecast.value > 0.6 && forecast <= 0.8) {
            icon=emergencia
            type="danger"
            text="Probabilidad media de inundación (" + String(Math.round(forecast.value*100)) + ")"
        } else {
            icon=emergencia
            type="danger"
            text="Probabilidad alta de inundación (" + String(Math.round(forecast.value*100)) + ")"
        }

        setAlertFText(text)
        setAlertFType(type)
        setAlertFIcon(icon)
        setAlertFOpen(true)
    }

    useEffect(() => {
        if(Object.entries(forecast).length) {
            handleForecast();
        }// eslint-disable-next-line
    }, [forecast]);

    useEffect(()=>{
        getTowns();
        getQuarters();// eslint-disable-next-line
    }, []);

    const handleError = (e) => {
        setAlertText(String(e))
        setAlertType("danger")
        setAlertOpen(true)
    }
     
    const handleNotification = (n,type) => {
        setAlertText(String(n))
        setAlertType(type)
        setAlertOpen(true)
    }

    const onRegister = () => {
        setModal(true)
    }

    const registerUser = async (payload) => {
        try {
            const {data} = await AlertService.createUser(payload);
            handleNotification("Registrado correctamente " + data.email, "success")
        }catch(e) {
            console.log(e)
            handleError(e)
        }
        setModal(false)
    }

    return(
        <Container fluid={true}>
            <Alert color={alertFType}
            isOpen={alertFOpen}
            toggle={()=>{setAlertFOpen(!alertFOpen)}}>
                <img src={alertFIcon} alt="alertIcon"/>
                {alertFText}
            </Alert>
            <Alert color={alertType}
            isOpen={alertOpen}
            toggle={()=>{setAlertOpen(!alertOpen)}}>
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
                            onRegister={onRegister}
                        />
                    </div>
                </Col>
                <Col md="8" lg="7">
                    <div>
                        <h4>Vialidades posiblemente afectadas:</h4>
                        <StreetMap
                        streets={streets}
                        quarter={quarter}
                        />
                    </div>
                </Col>
            </Row>
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Registro</ModalHeader>
                    <ModalBody>
                        <RegisterForm
                        registerUser={registerUser}/>
                    </ModalBody>
                </Modal>
            </div>
        </Container>
    );
}

export default Forecast;