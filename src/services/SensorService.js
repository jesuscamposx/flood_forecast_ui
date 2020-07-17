import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class SensorService { 
    static getSensorList() {
        return query({
            endpoint: SERVICE_ENDPOINTS.LIST_SENSORS,
            method: 'GET'
        });
    }
}

export default SensorService;