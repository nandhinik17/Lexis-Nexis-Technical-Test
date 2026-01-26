const envData = require('../../conf/apps-envs-urls.json');

class ApiHelper {

    getEndpoint(key) {
        const env = process.env.ENV || 'dev';
        if (!envData[env] || !envData[env].api || !envData[env].api.endpoints) {
            throw new Error(`API endpoints not configured for env=${env}`);
        }
        const endpoint = envData[env].api.endpoints[key];
        if (!endpoint) throw new Error(`Endpoint '${key}' not found for env=${env}`);
        return endpoint;
    }


}

module.exports = new ApiHelper();
