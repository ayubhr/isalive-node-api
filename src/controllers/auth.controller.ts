import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import _ from 'lodash';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, status: true });
    } catch (error) {
      next(error);
    }
  };

  public getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const userToken = req.token;

      let user = _.pick(userData, ['username', 'uuid', 'status', 'created_at', 'updated_at']);

      res.status(200).json({ user: user, token: userToken, status: true });
    } catch (error) {
      next(error);
    }
  };

  public generateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const userToken = req.token;

      const updated_userData = await this.authService.generateToken(userData);

      res.status(200).json({ uuid: updated_userData.generatedToken, status: true });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, tokenData, findUser } = await this.authService.login(userData);

      let user = _.pick(findUser, ['username', 'uuid', 'status', 'created_at', 'updated_at']);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user: user, token: tokenData.token, status: true });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
