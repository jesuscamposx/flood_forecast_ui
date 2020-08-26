import query from './../utils/query';
import SERVICE_ENDPOINTS from './ServicesEndpoints';

class FileService { 
    static getFloodCatalogue() {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_FLOOD_CATALOGUE,
            method: 'GET'
        });
    }

    static getMeasureCatalogue() {
        return query({
            endpoint: SERVICE_ENDPOINTS.GET_MEASURES_CATALOGUE,
            method: 'GET'
        });
    }
}

export default FileService;