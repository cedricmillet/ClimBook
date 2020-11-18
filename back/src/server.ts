/** TSED core */
import { Configuration, Inject, PlatformApplication } from "@tsed/common";
import "@tsed/passport";
import "@tsed/platform-express";

/** Usefull Middlewares */
import * as compress from "compression";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from 'cors';
import * as session from "express-session";
//import * as passport from "passport";
//import {LocalStrategy} from "passport-local";
var LocalStrategy   = require('passport-local');
/** Env config */
import { config } from './cfg/config';
import { User } from "./entities/user.entity";

import {CreateRequestSessionMiddleware} from "./middlewares/CreateRequestSession.middleware";

/** https://tsed.io/docs/controllers.html#request */

const rootDir = __dirname;
const apiPrefix = process.env.API_PREFIX || config.API_PREFIX;
const apiPort = process.env.API_PORT || config.API_PORT;
const mountedRoutes = {};
mountedRoutes[apiPrefix] = [`${rootDir}/routes/**/*.ts`];

@Configuration({
  rootDir,
  port: apiPort,
  acceptMimes: ["application/json"],
  mount: mountedRoutes,
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
    
    // Ajout des sessions
    this.app.getApp().set("trust proxy", 1); // trust first proxy
    this.app.use(session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false}
    }));
    this.app.use(CreateRequestSessionMiddleware);
    
    
  }
}
