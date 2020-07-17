import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Row, Col } from 'reactstrap';

// eslint-disable-next-line
const SensorsList = ({
    sensors,
    onClick
}) => {
    const [list, setList] = useState([]);

    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger']

    const generateList = () => {
        let i = 0
        let l = sensors.map((s) => {
            if(i > 5)
                i = 0
            return(<Button color={colors[i++]} 
                size="lg" 
                block 
                onClick={onClikButton}
                id={String(s.id_sensor)}
                >
                        <Row>
                            <Col xs="3" sm="3" md="3" lg="3">
                                <div className="circulo"
                                id={String(s.id_sensor)}>
                                    {s.id_sensor}
                                </div>
                            </Col>
                            <Col xs="9" sm="9" md="9" lg="9">
                                <Row className="sensor-item" id={String(s.id_sensor)}>
                                    {" Ubicación: " + s.calle.nombre}
                                </Row>
                                <Row className="sensor-item">
                                    {"lat: " + s.latitud + " long: " + s.longitud}
                                </Row>
                            </Col>
                        </Row>
            </Button>)
        })
        setList(l);
    }

    useEffect(() => {
        generateList();
        // eslint-disable-next-line
    }, [sensors]);

    const onClikButton = (e) =>{
        onClick(
            sensors.filter((s)=>(
                s.id_sensor === parseInt(e.target.id)
            ))
        );
    }

    return(
        <div className='list-scrollable'>
            { list }
        </div>
    )

};

SensorsList.propTypes = {
    sensors: PropTypes.array,
    onClick: PropTypes.func
}

SensorsList.defaultProps = {
    sensors: []
}

export default SensorsList;