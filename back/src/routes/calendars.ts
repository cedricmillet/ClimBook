import {Controller, Get, Post, BodyParams} from "@tsed/common";

@Controller("/calendars")
export class CalendarCtrl {

  @Get()
  findAll(): string {
    return "This action returns all calendars";
  }

  @Post()
  updatePayload(@BodyParams() payload: any): any {
    console.log("payload", payload);

    return payload;
  }
  
}

