import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { NotFound } from "@tsed/exceptions";
import { AuthCheck } from "../guards/login.guard";

@Controller("/voies")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  @(Returns(200, Array).Of(Voie).Description("Une voie"))
  @(Returns(404, NotFound).Description("Aucune voie existante"))
  //@UseAuth(AuthCheck)
  async findAll(): Promise<Voie[]> {
    const voies = await new DAO_Voie().getAll(false);
    return voies;
  }

  @Post()
  updatePayload(@BodyParams() payload: any): any {
    console.log("payload", payload);

    return payload;
  }
  
}

