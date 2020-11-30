import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from "../entities/user.entity";
import { DAO_Role } from '../dao/roles.dao';
import { DBManager } from "../dao";


@Controller("/classement")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<any[]> {
    
    const query: string = `SELECT * FROM getclassementgeneral() AS (user_id INTEGER, pseudo VARCHAR, score BIGINT);`;
    const values = [];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    console.log(result)
    return result.rows;
  }



}

