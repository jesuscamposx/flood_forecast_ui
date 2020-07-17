import React, { useState, useEffect } from 'react';
import { Input, Label, Button } from 'reactstrap';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import 'react-calendar/dist/Calendar.css';

const ForecastPanel = ({
    towns,
    quarters,
    onRequest,
    forecast
}) => {
    const [quarter, setQuarter] = useState("");
    const [flQuarters, setFlQuarters] = useState([]);
    const [dt, setDt] = useState(new Date());

    useEffect(() => {
        setFlQuarters(quarters)
    },[quarters]);

    const onTownChange = (e) => {

    }

    const onQuarterChange = (e) => {
        if(e.target.value === "(Colonia)") {
            setQuarter("")
        } else {
            let q = e.target.value.split("-")[0];
            setQuarter(q);
        }
    }

    const doRequest = () => {
        if(quarter.length > 0) {
            let d = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()
            console.log(d)
            onRequest("colonia="+quarter+"&fecha="+d)
        }
    }

    const onCalendarChange = (date) => {
        setDt(date)
    }

    return(
        <div>
            <Label for="tnSl">Alcaldía:</Label>
            <Input type="select" name="townSelect" id="tnSl" onChange={ onTownChange }>
                {towns.map((t) => (
                    <option id={t.id_alcadia}>
                        {t.nombre}
                    </option>
                ))}
            </Input>
            <Label for="qtSl">Colonia:</Label>
            <Input type="select" name="quarterSelect" id="qtSl" onChange={ onQuarterChange }>
                <option>(Colonia)</option>
                {flQuarters.map((q) => (
                    <option id={q.id_colonia}>
                        {q.id_colonia + "-" + q.nombre}
                    </option>
                ))}
            </Input>
            <Label for="cal">Fecha:</Label>
            <Calendar
                id="cal"
                onChange={onCalendarChange}
                value={dt}
            />
            <Button
                size="md"
                color="primary"
                onClick={ doRequest }>
                    Enviar
            </Button>
        </div>
    );
}
ForecastPanel.propTypes = {
    towns: PropTypes.array,
    quarters: PropTypes.array
}

ForecastPanel.defaultProps = {
    towns: [],
    quarters: []
}

export default ForecastPanel;