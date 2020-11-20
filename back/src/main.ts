
import * as chalk from 'chalk';         //  https://www.npmjs.com/package/chalk
import {$log as log, Logger} from "@tsed/common";
import {PlatformExpress} from "@tsed/platform-express";
import { Server } from "./server";
import { DBManager } from './dao';


(async () => {
  log.info('Lancement du backend....');

  /** Attente du lancement du container postgres */
  let dbConnected: boolean = false;
  while(!dbConnected)  await db_force_connect_loop();  

  /** Lancement de l'API */
  init_framework();
})();


/**
 * Lancer le framework (routes, controllers, protols, guars, middlewares)
 */
async function init_framework() {
  try {
    log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server, {});
    await platform.listen();
    log.debug("Server initialized");
  } catch (er) {
    log.error(er);
  }
}

/**
 * Lorsque la DB n'est pas encore prête, on boucle la tentative de connexion
 */
function db_force_connect_loop() : Promise<boolean> {
  return new Promise(async (res) => {
    try {
      await DBManager.connect();
      res(true);
    } catch (error) {
      const retryDelayMs: number = 5000;
      log.error(chalk.redBright("Erreur connexion DB : ", error));
      log.error(chalk.yellow.inverse(`Nouvelle tentative de connexion dans ${retryDelayMs/1000} s`))
      setTimeout(() => { res(false) }, retryDelayMs)
    }
  });
}
