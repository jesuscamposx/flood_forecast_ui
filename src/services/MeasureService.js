import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class MeasureService { 
    static getMeasureList() {
        return query({
            endpoint: SERVICE_ENDPOINTS.LIST_MEASURES,
            method: 'GET'
        });
    }

    static getLastValue(sensor) {
        const q = SERVICE_ENDPOINTS.GET_LAST_MEASURE + sensor
        return query({
            endpoint: q,
            method: 'GET'
        });
    }
}

export default MeasureService;