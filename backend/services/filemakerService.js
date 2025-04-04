//services/filemakerService.js
const axios = require('axios');
const https = require('https');
const config = require('../config/filemakerConfig');
const qs = require('qs');

// Variable pour stocker le token (évite de demander un nouveau token à chaque requête)
let authToken = null;
let tokenExpiration = null;

// Agent HTTPS qui désactive la vérification SSL
const agent = new https.Agent({
    rejectUnauthorized: false, // Ignore les erreurs de certificat SSL
});

class FilemakerService {
    // Obtenir un token d'authentification FileMaker
    static async getToken() {
        if (authToken && tokenExpiration > Date.now()) {
            return authToken;
        }

        try {
            const response = await axios.post(
                `${config.apiUrl}/sessions`,
                {},
                {
                    auth: {
                        username: config.username,
                        password: config.password,
                    },
                    httpsAgent: agent,
                }
            );
            authToken = response.headers['x-fm-data-access-token'];
            tokenExpiration = Date.now() + 15 * 60 * 1000;
            return authToken;
        } catch (error) {
            console.error('Erreur lors de l’obtention du token FileMaker:', error.response?.data || error.message);
            throw new Error('Échec de l’authentification FileMaker');
        }
    }

    // Récupérer des données depuis un layout spécifique
    static async getRecords(layoutName, limit = 10) {
        try {
            const token = await this.getToken();
            const response = await axios.get(
                `${config.apiUrl}/layouts/${encodeURIComponent(layoutName)}/records`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    httpsAgent: agent,
                    params: {
                        _limit: limit, // Limite configurable
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { encode: false });
                    },
                }
            );
            console.log(JSON.stringify(response.data.response.data, null, 2)); // Pour voir ce qu'on reçoit
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error.response?.data || error.message);
            throw new Error('Échec de la récupération des données');
        }
    }
}

module.exports = FilemakerService;