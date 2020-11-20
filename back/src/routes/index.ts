import {ContentType, Controller, Get} from "@tsed/common";
import { Summary } from "@tsed/schema";
import { config } from "../cfg/config";

@Controller("/")
@ContentType("json")
export class CalendarCtrl {

  @Get()
  findAll() {
    return {
      status: 200,
      message: "Bienvenue sur l'index de l'API"
    };
  }
  
}

