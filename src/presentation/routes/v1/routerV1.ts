import {Router} from 'express';
import statusRouter from './status.router.js';
import typeRouter from './requestType.router.js';
import reasonRouter from './requestReason.router.js';
import partialDayRouter from './partialDay.router.js';
import userRouter from './user.router.js';
import requestRouter from './request.router.js';
const routerV1 = Router();
routerV1.use('/request-types', typeRouter);
routerV1.use('/partial-days', partialDayRouter);
routerV1.use('/status', statusRouter);
routerV1.use('/request-reasons', reasonRouter);
routerV1.use('/requests', requestRouter);
routerV1.use('/users', userRouter);
export default routerV1;
