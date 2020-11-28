import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from '../entities/user.entity';


@Controller("/utilisateurs")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<User[]> {
    const voies = await new DAO_Utilisateur().getAll(false);
    return voies;
  }

  @Post()
  //@UseAuth(AuthCheck)
  async updateOne(@Required() @BodyParams("user") usr: any) {
    const user = new UserBuilder().fromDataSet(usr);
    const update = await new DAO_Utilisateur().update(user);
    console.log("update user : ", update);
    return true;
  }

  @Delete('/:id')
  //@UseAuth(AuthCheck)
  async deleteOne(@PathParams("id") id: number) {
    const del = await new DAO_Utilisateur().delete(id);
    return del;
  }

  @Post('/:id/changepwd')
  //@UseAuth(AuthCheck)
  async changePwd(@PathParams("id") id: number, @Required() @BodyParams("pwd") pwd: string) {
    const update = await new DAO_Utilisateur().updatePassword(id, pwd);
    return update;
  }

}

