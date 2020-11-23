import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, QueryParams, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';
import { NotFound } from '@tsed/exceptions';

@Controller("/voies")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(@QueryParams() params: any): Promise<any> {

    const voies = await new DAO_Voie().getAll(false);
    
    
    if (params.hasOwnProperty('niveaux')) {
      const niveaux = await new DAO_Niveau().getAll();
      voies.forEach(voie => {
        const niv = niveaux.find((n) => n.getId() === voie.id_niveau);
        voie.niveau = niv ? niv.getData() : null;
      });
    }

    

    return JSON.stringify(voies);
  }

  /**
   * Récupérer des infos sur une voie donnée
   * il est possible d'ajouter des arguments
   */
  @Get("/:id")
  //@UseAuth(AuthCheck)
  async findOne(@PathParams("id") id: string, @QueryParams() params: any): Promise<any> {

    const voie = await new DAO_Voie().getById(parseInt(id));
    if (!(voie instanceof Voie)) return new NotFound(`Impossible de trouver la voie id = ${id}`);
    const vData = voie.getData();
    /*
    if (params.hasOwnProperty('includesLastAscencions')) {
      const niveaux = await new DAO_Niveau().getAll();
      voies.forEach(voie => {
        const niv = niveaux.find((n) => n.getId() === voie.id_niveau);
        voie.niveau = niv ? niv.getData() : null;
      });
    }*/

    return JSON.stringify(vData);
  }

}

