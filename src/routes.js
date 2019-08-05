import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import authMiddleware from './app/middlewares/auth';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';
import HorarioController from './app/controllers/HorarioController';

import TokenController from './app/controllers/TokenController';
import CategoryController from './app/controllers/CategoryController';
import ProductController from './app/controllers/ProductController';
import ProductVariationController from './app/controllers/ProductVariationController';
import ProductImageController from './app/controllers/ProductImageController';
import CategoryProductController from './app/controllers/CategoryProductController';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * criar user
 */

routes.post('/users', UserController.store);

/**
 * validar email do user
 *
 */

routes.get('/token/:token', TokenController.index);
routes.post('/token', TokenController.update);

routes.post('/sessions', SessionController.store);
//* ******************************************** */
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);

routes.get('/productvariations', ProductVariationController.index);
routes.post('/productvariations', ProductVariationController.store);

routes.post('/images', upload.single('file'), ProductImageController.store);

routes.get('/categoryproducts', CategoryProductController.index);
routes.post('/categoryproducts', CategoryProductController.store);

/**
 * routes.get('/confirmation/:token', controllers.UserController.confirmationPost)
routes.post('/confirmation', controllers.UserController.confirmationPost)

routes.get('/redefinirSenha/:token', controllers.RedefinirSenhaController.index)
routes.post('/resend', controllers.UserController.resendTokenPost)

routes.get(
  '/solicitarRecuperacaoSenha',
  controllers.RedefinirSenhaController.solicitarRecuperacaoSenha
)
routes.post(
  '/redefinirSenhaPost',
  controllers.RedefinirSenhaController.redefinirSenhaPost
) */

routes.use(authMiddleware);

routes.put('/users', authMiddleware, UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/horarios', HorarioController.store);
routes.get('/horarios', HorarioController.index);
routes.put('/horarios/:id', HorarioController.update);
routes.delete('/horarios/:id', HorarioController.delete);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
