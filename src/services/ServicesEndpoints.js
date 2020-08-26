const baseUrl = process.env.REACT_APP_API_URL;

const SERVICE_ENDPOINTS = {
    LIST_SENSORS: '/api/sensor',
    LIST_MEASURES: '/api/medicion',
    GET_LAST_MEASURE: '/api/medicion/ultima?sensor=',
    GET_FLOOD_CATALOGUE: '/api/archivo/inundacion/catalogo',
    GET_MEASURES_CATALOGUE: '/api/archivo/nivel-agua/catalogo',
    GET_FLOOD_FILE: baseUrl + '/api/archivo/inundacion?years=',
    GET_MEASURES_FILE: '/api/archivo/nivel-agua?years=',
    LIST_TOWNS: '/api/alcaldia',
    LIST_QUARTERS: '/api/colonia',
    LIST_STREETS: '/api/calle?colonia=',
    GET_FORECAST: '/api/ml/prediccion?',
    CREATE_USER: '/api/alerta'
}

export default SERVICE_ENDPOINTS;