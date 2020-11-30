import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Delete, Required, PathParams} from "@tsed/common";
import { Voie } from "../entities/voie.entity";
import { DAO_Voie } from '../dao/voies.dao';
import { AuthCheck } from "../guards/login.guard";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { User, UserBuilder } from "../entities/user.entity";
import { DAO_Role } from '../dao/roles.dao';


@Controller("/classement")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<User[]> {
    /*
    const query: string = `SELECT public`;
    const values = [newPassword, userId];
    const pool = DBManager.getPool();
    const result = await pool.query(query, values);
    console.log(result)
    return result.rows;*/
    return [];
  }



}

