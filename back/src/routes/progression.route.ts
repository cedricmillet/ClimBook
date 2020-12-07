import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams, Session} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from "../entities/user.entity";
import { DAO_Role } from '../dao/roles.dao';
import { DBManager } from "../dao";


@Controller("/progression")
@ContentType("json")
export class ProgressionCtrl {

  @Get('/')
  async getAllv2(@Session("user") sess: any) {
    return JSON.stringify(sess)
  }

  @Get('/:id')
  //@UseAuth(AuthCheck)
  async findAll(@PathParams("id") id: number, @Session() sess: any): Promise<any[]> {
    console.log("SESSION = ", sess)
    const query: string = `SELECT * FROM getdernieresascensions($1, 10) AS (voie VARCHAR, niv_difficulte INTEGER, niv_cotation VARCHAR, couleur VARCHAR);`;
    const values = [id];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    //console.log(result)
    return result.rows;
  }



}

