import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class ForecastService { 
    static getTowns() {
        return query({
            endpoint: SERVICE_ENDPOINTS.LIST_TOWNS,
            method: 'GET'
        });
    }

    static getQuarters() {
        return query({
            endpoint: SERVICE_ENDPOINTS.LIST_QUARTERS,
            method: 'GET'
        });
    }

    static getForecast(param) {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_FORECAST + param,
            method: 'GET'
        });
    }
}

export default ForecastService;