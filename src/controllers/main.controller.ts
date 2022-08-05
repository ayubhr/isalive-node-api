import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import { Users } from '@models/users.model';
import { Hostnames } from '@models/hostnames.model';
import { cleanHost, isEmpty } from '@utils/util';

import UtilsService from '@services/utils.service';

class MainController {
  public utilsService = new UtilsService();

  public addHostname = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userID = req.userID;

      const reqData = req.body;

      let hostname = reqData.hostname;
      let links = JSON.stringify(reqData.links);

      let newHost = await Hostnames.query().insert({ host: hostname, owner: userID, status: '1', rlinks: links }).into('hostnames');

      res.status(200).json({ message: 'OK', data: reqData });
    } catch (error) {
      next(error);
    }
  };

  public getHostnames = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userID = req.userID;

      let hostnames = await Hostnames.query().select().from('hostnames').where('owner', '=', userID);

      res.status(200).json({ message: 'OK', data: hostnames });
    } catch (error) {
      next(error);
    }
  };

  public updateHostnameLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userID = req.userID;

      let hostnameID = req.body.hostname_id;
      let links = JSON.stringify(req.body.links);

      const updatedHost = await Hostnames.query().where({ id: hostnameID, owner: userID }).update({ rlinks: links });

      res.status(200).json({ message: 'OK', data: updatedHost });
    } catch (error) {
      next(error);
    }
  };

  public removeHostname = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userID = req.userID;

      let hostnameID = req.body.hostname_id;

      const removeHost = await Hostnames.query().where({ id: hostnameID, owner: userID }).del();

      res.status(200).json({ message: 'OK', data: removeHost });
    } catch (error) {
      next(error);
    }
  };

  public magic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let fgToken = req.headers['fg-token'];
      let fgHost = cleanHost(req.headers['fg-host']);

      let user = await Users.query().select().from('users').where('uuid', '=', fgToken).first();

      if (isEmpty(user)) {
        return res.status(200).json({ status: false, message: 'token mismatch our records !' });
      }

      let hostname = await Hostnames.query().select().from('hostnames').where({ owner: user.id }).whereLike('host', `%${fgHost}%`).first();

      if (isEmpty(hostname)) {
        return res.status(200).json({ status: false, message: `this token is stolen or host : ${fgHost} doesn't exist !` });
      }

      let hostLinks = JSON.parse(hostname.rlinks);

      if (isEmpty(hostLinks)) {
        return res.status(200).json({ status: false, message: `this host : ${fgHost} doesn't have links yet !` });
      }

      let check_test = await this.utilsService.checkHostLinks(hostLinks);

      if (isEmpty(check_test)) {
        return res.status(200).json({ status: false, message: `this host : ${fgHost} doesn't have any clean links` });
      }

      res.status(200).json({ url: check_test });
    } catch (error) {
      next(error);
    }
  };
}

export default MainController;
