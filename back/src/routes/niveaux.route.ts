import {Controller, Get, Post, BodyParams, ContentType, Returns, UseAuth, Required, Delete, PathParams, Put} from "@tsed/common";
import { AuthCheck } from "../guards/login.guard";
import { DAO_Niveau } from '../dao/niveaux.dao';
import { Niveau, NiveauBuilder } from '../entities/niveau.entity';

@Controller("/niveaux")
@ContentType("json")
export class NiveauCtrl {

  /** list all */
  @Get()
  //@UseAuth(AuthCheck)
  async findAll(): Promise<Niveau[]> {
    const voies = await new DAO_Niveau().getAll(false);
    return voies;
  }

  /** add one */
  @Put()
  //@UseAuth(AuthCheck)
  async addOne(@Required() @BodyParams("niveau") niveau: any) {
    const niv = new NiveauBuilder().fromDataSet(niveau);
    const update = await new DAO_Niveau().insert(niv);
    console.log("add niveau : ", update);
    return true;
  }

  /** update one */
  @Post()
  //@UseAuth(AuthCheck)
  async updateOne(@Required() @BodyParams("niveau") niveau: any) {
    const niv = new NiveauBuilder().fromDataSet(niveau);
    const update = await new DAO_Niveau().update(niv);
    console.log("update niveau : ", update);
    return true;
  }

  /** delete one */
  @Delete('/:id')
  //@UseAuth(AuthCheck)
  async deleteOne(@PathParams("id") id: number) {
    const del = await new DAO_Niveau().delete(id);
    return del;
  }

}

