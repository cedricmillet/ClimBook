import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";

@Controller("/voies")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<Voie[]> {
    const voies = await new DAO_Voie().getAll(false);
    return voies;
  }

}

