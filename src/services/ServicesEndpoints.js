const SERVICE_ENDPOINTS = {
    LIST_SENSORS: 'http://localhost:8000/api/sensor',
    LIST_MEASURES: 'http://localhost:8000/api/medicion',
    GET_LAST_MEASURE: 'http://localhost:8000/api/medicion/ultima?sensor=',
    GET_FLOOD_CATALOGUE: 'http://localhost:8000/api/archivo/inundacion/catalogo',
    GET_MEASURES_CATALOGUE: 'http://localhost:8000/api/archivo/nivel-agua/catalogo',
    GET_FLOOD_FILE: 'http://localhost:8000/api/archivo/inundacion?years=',
    GET_MEASURES_FILE: 'http://localhost:8000/api/archivo/nivel-agua?years=',
    LIST_TOWNS: 'http://localhost:8000/api/alcaldia',
    LIST_QUARTERS: 'http://localhost:8000/api/colonia',
    GET_FORECAST: 'http://localhost:8000/api/ml/prediccion?',
}

export default SERVICE_ENDPOINTS;