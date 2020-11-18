/** TSED core */
import { Configuration, Inject, PlatformApplication } from "@tsed/common";

/** Usefull Middlewares */
import * as compress from "compression";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from 'cors';
//import * as passport from "passport";
//import {LocalStrategy} from "passport-local";
var LocalStrategy   = require('passport-local');
/** Env config */
import { config } from './cfg/config';
import { User } from "./entities/user.entity";


/** https://tsed.io/docs/controllers.html#request */

const rootDir = __dirname;
const apiPrefix = config.apiPrefix;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api/v1": [  /** /api/v1 */
      `${rootDir}/routes/**/*.ts`
    ]
  },
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
      //.use(passport.initialize())
      //.use(passport.session())
      .use(bodyParser.urlencoded({
        extended: true
      })
        
      
        
      );
  }
}
