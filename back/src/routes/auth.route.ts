import {Controller, Get, Post, UseAuth, Status, Session, BodyParams,Required} from "@tsed/common";
import {AuthCheck} from "../guards/login.guard";
import { User , Users} from "../entities/user.entity";
import * as session from 'express-session';
import { NotFound } from "@tsed/exceptions";

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
      const usr: User = await Users.find(login, pass);
      /** Mise a jour de la session coté serveur */
      user.id = usr.getId();
      return JSON.stringify({ success:true, user: usr });
    } catch (error) {
      throw new NotFound("Unknown User");
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
    user = null;
  }


  /**
   * @api {get} /auth/status Get auth status
   * @apiGroup Auth
   * @apiSuccess user Infos sur l'utilisateur connecté
   */
  @Get("/status")
  @UseAuth(AuthCheck, {role: "admin"}) // or for specific endpoints
  public check() {
    return "OK !!!!"
  }
}