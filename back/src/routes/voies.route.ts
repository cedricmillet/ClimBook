import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, QueryParams, PathParams, Delete, Required, Put} from "@tsed/common";
import { Voie, VoieBuilder } from '../entities/voie.entity';
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';
import { NotFound } from '@tsed/exceptions';
import { DBManager } from "../dao";

@Controller("/voies")
@ContentType("json")
export class VoieCtrl {

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

  /** add one */
  @Put()
  //@UseAuth(AuthCheck)
  async addOne(@Required() @BodyParams("voie") voie: any) {
    const obj = new VoieBuilder().fromDataSet(voie);
    console.log("ajout en bdd : ", obj)
    const update = await new DAO_Voie().insert(obj);
    console.log("add voie : ", update);
    return true;
  }

  /** update one */
  @Post()
  //@UseAuth(AuthCheck)
  async updateOne(@Required() @BodyParams("voie") voie: any) {
    const bloc = new VoieBuilder().fromDataSet(voie);
    const update = await new DAO_Voie().update(bloc);
    console.log("update voie : ", update);
    return true;
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
  
  
  @Delete('/:id')
  //@UseAuth(AuthCheck)
  async deleteOne(@PathParams("id") id: number) {
    const del = await new DAO_Voie().delete(id);
    return del;
  }


  

  @Get("/:id/bestgrimp")
  //@UseAuth(AuthCheck)
  async bestGrimpOfVoie(@PathParams("id") id: number, @QueryParams() params: any): Promise<any> {
    const q: string = `SELECT * FROM getBestGrimp($1) AS (user_id INTEGER, pseudo VARCHAR, chrono TIME);`;
    const r:  any[] = [id];
    const pool = DBManager.getPool();
    const result = await pool.query(q, r);

    if (!result.rows) return JSON.stringify([]);
    return JSON.stringify(result.rows);
  }

  @Get("/:id/avg")
  //@UseAuth(AuthCheck)
  async getTempsMoyen(@PathParams("id") id: number, @QueryParams() params: any): Promise<any> {
    const q: string = `SELECT getTempsMoyen($1) as avg`;
    const r:  any[] = [id];
    const pool = DBManager.getPool();
    const result = await pool.query(q, r);

    if (!result.rows) return JSON.stringify([]);
    return JSON.stringify(result.rows);
  }

}

