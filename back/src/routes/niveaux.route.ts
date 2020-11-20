import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';
import { Niveau } from '../entities/niveau.entity';

@Controller("/niveaux")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<Niveau[]> {
    const voies = await new DAO_Niveau().getAll(false);
    return voies;
  }

}

