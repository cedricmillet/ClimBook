/** TSED core */
import { Configuration, Inject, PlatformApplication } from "@tsed/common";

/** Usefull Middlewares */
import * as compress from "compression";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from 'cors';

/** Env config */
import { config } from './cfg/config';

const rootDir = __dirname;
const apiPrefix = config.apiPrefix;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api/v1": [  /** /api/v1 */
      `${rootDir}/routes/**/*.ts`
    ]
  }
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
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
