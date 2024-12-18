import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, this.authController.logIn);
    this.router.get(`${this.path}get-me`, authMiddleware, this.authController.getMe);
    this.router.get(`${this.path}generate-token`, authMiddleware, this.authController.generateToken);
    this.router.get(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
