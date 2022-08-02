import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { Users } from '@models/users.model';
import { isEmpty, generateToken } from '@utils/util';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Users = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (findUser) throw new HttpException(409, `You're username ${userData.username} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const generatedToken = generateToken();

    const createUserData: User = await Users.query()
      .insert({ ...userData, password: hashedPassword, status: true, uuid: generatedToken })
      .into('users');

    return createUserData;
  }

  public async generateToken(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (!findUser) throw new HttpException(409, `You're username ${userData.username} not found`);

    const generatedToken = generateToken();

    const updatedUserData: User = await Users.query().where({ id: findUser.id }).update({ uuid: generatedToken });

    return { updatedUserData, generatedToken, findUser };
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; tokenData: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (!findUser) throw new HttpException(409, `You're username ${userData.username} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, tokenData, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await Users.query()
      .select()
      .from('users')
      .where('username', '=', userData.username)
      .andWhere('password', '=', userData.password)
      .first();

    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
