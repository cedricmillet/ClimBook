import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from "../entities/user.entity";
import { DAO_Role } from '../dao/roles.dao';


@Controller("/roles")
@ContentType("json")
export class RoleCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<User[]> {
    const data = await new DAO_Role().getAll(false);
    return data;
  }

  @Delete('/:id')
  //@UseAuth(AuthCheck)
  async deleteOne(@PathParams("id") id: number) {
    const del = await new DAO_Role().delete(id);
    return del;
  }

}

