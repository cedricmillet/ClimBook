import {Controller, Get, Post, UseAuth, Status, Session, BodyParams,Required} from "@tsed/common";
import {AuthCheck} from "../guards/login.guard";
import { User , Users} from "../entities/user.entity";
import * as session from 'express-session';
import { NotFound } from "@tsed/exceptions";
import * as chalk from "chalk";

// https://tsed.io/tutorials/session.html

@Controller("/auth")
export class AuthController {

  @Get("/session")
  whoAmI(@Session() session: any) {
    console.log("User in session =>", session);

    return JSON.stringify(session)
  }
  

  /**
   * @api {post} /auth/login Login user
   * @apiGroup Auth
   *
   * @apiParam {string} login Username/email de l'utilisateur
   * @apiParam {string} password Mot de passe de l'utilisateur
   *
   * @apiSuccess 200 Utilistaeur connecté avec succès
   * @apiError Unknown_User Utilisateur introuvable
   * 
   */
  @Post("/login")
  @Status(200, Boolean).Description("Success")
  async login(@Required() @BodyParams("login") login: string, @Required() @BodyParams("password") pass: string, @Session("user") user: any) {
    console.log(`>>> Identification utilisateur (${login}, ${pass})`);
    try {
      const usr: User = await Users.login(login, pass);
      if (!(usr instanceof User)) throw new Error(`introuvable en bdd ${login}/${pass} : usr=${usr}`);
      console.log(chalk.inverse.green(">>> LOGIN/PASS VALIDE POUR L'UTILISATEUR : " + login))
      /** Mise a jour de la session coté serveur */
      user.id = usr.getId();
      user.role = (await usr.getRole()).getRoleName();
      return JSON.stringify({ success:true, user: usr });
    } catch (error) {
      throw new NotFound("Unknown User : " + error);
    }    
  }

  /**
   * @api {post} /auth/logout Logout user
   * @apiGroup Auth
   * @apiSuccess 200 La session a bien été detruite 
   */
  @Post("/logout")
  async logout(@Session("user") user: any) {
    user.id = null;
    user.role = null;
  }


  /**
   * @api {get} /auth/status Get auth status
   * @apiGroup Auth
   * @apiSuccess user Infos sur l'utilisateur connecté
   */
  @Get("/status")
  @UseAuth(AuthCheck) // check utilisateur identifié
  public check(@Session("user") user: any) {
    return "OK !!!! : user =    " + JSON.stringify(user)
  }

  @Get("/admin")
  @UseAuth(AuthCheck, {role: "admin"}) // check utilisateur admin
  public admincheck(@Session("user") user: any) {
    return "OK !!!! : user =    " + JSON.stringify(user)
  }
}