import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User } from "src/entities/user.entity";


@Controller("/utilisateurs")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<User[]> {
    const voies = await new DAO_Utilisateur().getAll(false);
    return voies;
  }

}

