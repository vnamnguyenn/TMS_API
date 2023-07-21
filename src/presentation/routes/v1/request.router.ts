import express from 'express';
import {RequestController} from '../../controllers/request.controller.js';
import {checkRequiredRoles, validAccessToken} from '../../middleware/auth0.middleware.js';
import {Roles} from '../../../shared/enums/role.enum.js';

const requestRouter = express.Router();
const requestController = new RequestController();
// requestRouter.use(validAccessToken);
requestRouter.post('/', requestController.create);
// requestRouter.get('/', checkRequiredRoles([Roles.User, Roles.Supervisor, Roles.Admin]), requestController.getAll);
requestRouter.get('/', requestController.getAll);
requestRouter.get('/:id', requestController.getById);
requestRouter.patch('/change-status', requestController.updateStatus);
requestRouter.patch('/:id/cancel', requestController.cancel);
requestRouter.put('/:id', requestController.update);
export default requestRouter;
