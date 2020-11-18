
import * as express from 'express';          //  https://www.npmjs.com/package/express
import * as chalk from 'chalk';         //  https://www.npmjs.com/package/chalk



import {$log as log} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import { Server } from "./server";
import { DBManager } from './dao';
import { DAO_Utilisateur } from './dao/utilisateurs.dao';
import { User, UserBuilder } from './entities/user.entity';


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

(async () => {
  console.log('Lancement du backend....');
  await DBManager.connect();

  const user: User = new UserBuilder().setRoleId(1).setPseudo('jean jean').setMdp('1234').setEmail('gmail.com').build();
  //const uid = await new DAO_Utilisateur().insert(user);
  //console.log(uid)
  //const del = await new DAO_Utilisateur().delete(add);
  //console.log(del)
  const all = await new DAO_Utilisateur().getAll();
  console.log(">>>> res = ", all)
  //bootstrap();
})();


//const apiPort = process.env.API_PORT || 8080;
//console.log('VAr = ', apiPort);
