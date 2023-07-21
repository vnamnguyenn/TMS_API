import express, {Express, NextFunction, Request, Response} from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import nocache from 'nocache';
import {swaggerSpecV1, swaggerSpecV2, customCss} from './presentation/swagger/swagger.config.js';
import routerV1 from './presentation/routes/v1/routerV1.js';
import {localIp} from './shared/getLocalIp.js';
import {errorHandler} from './presentation/middleware/error.middleware.js';
import {notFoundHandler} from './presentation/middleware/not-found.middleware.js';

dotenv.config();

export default class App {
    private app: Express;
    public port: number;
    public clientOriginUrl: string;

    constructor(port: number, clientOriginUrl: string) {
        this.app = express();
        this.port = port;
        this.clientOriginUrl = clientOriginUrl;
        this.initializeMiddlewares();
        this.initializeRouters();
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: this.clientOriginUrl.split(','),
            methods: ['DELETE', 'GET', 'POST', 'PUT', 'PATCH'],
            allowedHeaders: ['Authorization', 'Content-Type'],
            maxAge: 86400,
        }));
        this.app.set('json spaces', 2);
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(
            helmet({
                hsts: {
                    maxAge: 31536000,
                },
                contentSecurityPolicy: {
                    useDefaults: false,
                    directives: {
                        'default-src': ['\'none\''],
                        'frame-ancestors': ['\'none\''],
                    },
                },
                frameguard: {
                    action: 'deny',
                },
            }),
        );

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            // res.contentType('application/json; charset=utf-8');
            res.setHeader(
                'Content-Security-Policy',
                `connect-src 'self' ${process.env.DEFAULT_DOMAIN}`,
            ); // Set Content-Security-Policy header
            next();
        });
        this.app.use(nocache());
    }

    private initializeRouters() {
        const apiV1Html = swaggerUi.generateHTML(swaggerSpecV1, customCss);
        const apiV2Html = swaggerUi.generateHTML(swaggerSpecV2);
        this.app.use('/api/v1/docs', swaggerUi.serveFiles(swaggerSpecV1));
        this.app.get('/api/v1/docs', (req: Request, res: Response) => {
            res.send(apiV1Html);
        });
        this.app.use('/api/v2/docs', swaggerUi.serveFiles(swaggerSpecV2));
        this.app.get('/api/v2/docs', (req: Request, res: Response) => {
            res.send(apiV2Html);
        });
        this.app.use('/api/v1/', routerV1);
        this.app.use(errorHandler);
        this.app.use(notFoundHandler);
    }

    public listen() {
        this.app.listen(this.port, () => {
            const currentTime = new Date();
            const options: Intl.DateTimeFormatOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZone: "Asia/Saigon",
            };
            const formatter = new Intl.DateTimeFormat('vi-VN', options);

            console.log(`listening on port ${this.port} - ${formatter.format(currentTime)}`);
        });
    }

    public connectToTheDatabase() {
    }
}
