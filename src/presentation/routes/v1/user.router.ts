import {UserController} from '../../controllers/user.controller.js';

const userController: UserController = new UserController();
import {Router} from 'express';
import {checkRequiredPermissions, validAccessToken} from '../../middleware/auth0.middleware.js';
import {UsersPermission} from '../../../shared/permissions/user.permission.js';

const userRouter = Router();
// userRouter.use(validAccessToken);
userRouter.get('/', userController.getAll);
userRouter.post('/', validAccessToken, checkRequiredPermissions([UsersPermission.Create]), userController.create);
userRouter.get('/:id', userController.getById);
export default userRouter;
