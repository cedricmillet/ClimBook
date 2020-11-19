
import * as express from 'express';          //  https://www.npmjs.com/package/express
import * as chalk from 'chalk';         //  https://www.npmjs.com/package/chalk



import {$log as log, Logger} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import { Server } from "./server";
import { DBManager } from './dao';
import { DAO_Utilisateur } from './dao/utilisateurs.dao';
import { User, UserBuilder, UserFields } from './entities/user.entity';


async function init_framework() {
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
/*
  const build: User = new UserBuilder().setRoleId(1).setPseudo('jean jean').setMdp('1234').setEmail('gmail.com').build();
  //console.log("depuis le builder: ", user)
  const insert = await new DAO_Utilisateur().insert(build);
  //console.log(insert);
  console.log("Inséré = ", insert)
  
  insert.set(UserFields.roleId, 3)
  const update = await new DAO_Utilisateur().update(insert);
  //console.log("updateStatus = ", update)

  const usr = await new DAO_Utilisateur().getById(insert.getId());
  console.log(">>>> apres update = ", usr)
  */
  

  init_framework();
})();


//const apiPort = process.env.API_PORT || 8080;
//console.log('VAr = ', apiPort);
