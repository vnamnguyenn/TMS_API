import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
import {localIp} from '../../shared/getLocalIp.js';

const port = process.env.PORT || 5000;
export const swaggerSpecV1 = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'TMS API V1 Documentation',
            version: '1.0.0',
            description: 'Documentation for the API endpoints',
        },
        servers: [
            {
                url: `${process.env.API_PROD_URL}/v1`,
                description: 'Production server',
            },
            {
                url: 'http://localhost:9000/api/v1',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    apis: ['./**/v1/*.path.js', './**/v1/*.tag.js', './**/v1/*.schema.js'],
});

export const customCss = {
    customCss: '.swagger-ui .topbar { background-color: #008299; }',
};

export const swaggerSpecV2 = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'TMS API V2 Documentation',
            version: '2.0.0',
            description: 'Documentation for the API endpoints',
            contact: {
                name: 'JSONPlaceholder',
                url: 'https://jsonplaceholder.typicode.com',
            },
        },
        servers: [
            {
                url: 'http://125.212.254.160:8092/api/v2',
                description: 'Production server',
            },
            {
                url: `http://192.168.0.50:${port}/api/v2`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: {bearerAuth: []},
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    apis: ['./**/v2/*.path.js', './**/v2/*.tag.js', './**/v2/*.schema.js'],
});

// servers: [
//     {
//         url: 'http://125.212.254.160:8092',
//         description: 'Production server',
//     },
//     {
//         url: `http://${localIp?.address}:${port}`,
//         description: 'Development server',
//     },
//     {
//         url: `http://${localIp?.address}:8022`,
//         description: 'Testing server',
//     },
// ],
// components: {
//     securitySchemes: {
//         bearerAuth: {
//             type: 'http',
//             scheme: 'bearer',
//             bearerFormat: 'JWT',
//         },
//     },
// },
// security: {bearerAuth: []},
