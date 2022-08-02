import { Router } from 'express';
import MainController from '@controllers/main.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class MainRoute implements Routes {
  public path = '/';
  public router = Router();
  public mainController = new MainController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}add-hostname`, authMiddleware, this.mainController.addHostname);

    this.router.post(`${this.path}update-hostname`, authMiddleware, this.mainController.updateHostnameLinks);
    this.router.post(`${this.path}remove-hostname`, authMiddleware, this.mainController.removeHostname);
    this.router.get(`${this.path}my-hostnames`, authMiddleware, this.mainController.getHostnames);

    this.router.get(`${this.path}magic`, this.mainController.magic);
  }
}

export default MainRoute;
