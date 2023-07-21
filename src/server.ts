import App from './app.js';
import dotenv from 'dotenv';

dotenv.config();
if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error(
        'Missing required environment variables. Check docs for more info.',
    );
}

const app = new App(parseInt(process.env.PORT) || 7000, process.env.CLIENT_ORIGIN_URL || '*');
app.listen();
