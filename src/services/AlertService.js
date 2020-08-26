import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class AlertService { 
    static createUser(payload) {
        return query({
            endpoint: SERVICE_ENDPOINTS.CREATE_USER,
            data: payload
        });
    }
}

export default AlertService;