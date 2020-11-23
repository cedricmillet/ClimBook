import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, QueryParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';

@Controller("/voies")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(@QueryParams() params: any): Promise<any> {

    const voies = await new DAO_Voie().getAll();
    
    
    if (params.hasOwnProperty('niveaux')) {
      const niveaux = await new DAO_Niveau().getAll();
      voies.forEach(voie => {
        const niv = niveaux.find((n) => n.getId() === voie.get(voie.fields.id_niveau))
        voie.setCustom('niveau', niv ? niv.getData() : null);
      });
    }
    
    return JSON.stringify(voies);
  }

}

