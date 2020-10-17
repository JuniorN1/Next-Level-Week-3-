import {Router} from 'express';
import multer from 'multer';
import uploadConfig from './configs/upload';
import OrphanagesController from './controllers/OrphanagersController';
const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages',OrphanagesController.index);
routes.post('/create',upload.array('images'),OrphanagesController.create);

routes.get('/orphanages/:id',OrphanagesController.show);

export default routes;