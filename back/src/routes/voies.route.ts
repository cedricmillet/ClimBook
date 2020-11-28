import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, QueryParams, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';
import { NotFound } from '@tsed/exceptions';
import { DBManager } from "../dao";

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
    return JSON.stringify(vData);
  }



  

  @Get("/:id/bestgrimp")
  //@UseAuth(AuthCheck)
  async bestGrimpOfVoie(@PathParams("id") id: string, @QueryParams() params: any): Promise<any> {
    //const q: string = `SELECT getBestGrimp($1) as bests FROM voies WHERE id=$1`;
    const q: string = `SELECT getBestGrimp($1) as bests FROM voies WHERE id=$1`;
    const r: string[] = [id];
    const pool = DBManager.getPool();
    const result = await pool.query(q, r);

    if (!result.rows) return JSON.stringify([]);
    return JSON.stringify(result.rows);
    //manip du json
    /*
    const rArr = [];
    result.rows.forEach(row => {
      let escaped : string = (row['bests'].toString().substring(1));
      escaped = escaped.substring(0, escaped.length - 1);
      const cols = escaped.split(',');
      rArr.push({
        id_client: cols[0],
        pseudo: cols[1]
      })
    });
    return JSON.stringify(rArr);*/
  }

}

