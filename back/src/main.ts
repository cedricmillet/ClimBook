
import * as express from 'express';          //  https://www.npmjs.com/package/express
import * as chalk from 'chalk';         //  https://www.npmjs.com/package/chalk



import {$log as log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import { Server } from "./server";


async function bootstrap() {
  try {
    log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {
      // extra settings
    });

    await platform.listen();
    log.debug("Server initialized");
  } catch (er) {
    log.error(er);
  }
}

bootstrap();

//console.log('VAr = ', process.env);
console.log('ok');
