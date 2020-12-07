import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams, Put} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from '../entities/user.entity';


@Controller("/utilisateurs")
@ContentType("json")
export class UtilisateursCtrl {

  /** select all */
  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<User[]> {
    const voies = await new DAO_Utilisateur().getAll(false);
    return voies;
  }

  /** add one */
  @Put()
  //@UseAuth(AuthCheck)
  async addOne(@Required() @BodyParams("user") user: any) {
    const obj = new UserBuilder().fromDataSet(user);
    const update = await new DAO_Utilisateur().insert(obj);
    const updatePwd = await new DAO_Utilisateur().updatePassword(update.getId(), user.mdp);
    console.log("add user : ", update);
    console.log("change user password # ", update.getId(), " => ",  updatePwd);
    return true;
  }

  /** update one */
  @Post()
  //@UseAuth(AuthCheck)
  async updateOne(@Required() @BodyParams("user") usr: any) {
    const user = new UserBuilder().fromDataSet(usr);
    const update = await new DAO_Utilisateur().update(user);
    console.log("update user : ", update);
    return true;
  }

  /** delete one */
  @Delete('/:id')
  //@UseAuth(AuthCheck)
  async deleteOne(@PathParams("id") id: number) {
    const del = await new DAO_Utilisateur().delete(id);
    return del;
  }

  /** change user password */
  @Post('/:id/changepwd')
  //@UseAuth(AuthCheck)
  async changePwd(@PathParams("id") id: number, @Required() @BodyParams("pwd") pwd: string) {
    const update = await new DAO_Utilisateur().updatePassword(id, pwd);
    return update;
  }

}

