import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import UsuarioController from './app/controllers/UsuarioController';
import EnderecoController from './app/controllers/EnderecoController';

const routes = new Router();

routes.get('/teste', (request, response) => response.json({ ok: true }));
routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/usuarios', UsuarioController.store);
routes.put('/usuarios/:id', UsuarioController.update);
routes.get('/usuarios/', UsuarioController.index);
routes.delete('/usuarios/:id', UsuarioController.delete);
routes.get('/search', UsuarioController.search);

// Rotas para cadastro de endereco de usuarios
routes.post('/endereco', EnderecoController.store);
export default routes;
