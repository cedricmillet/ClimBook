import {Controller, Get, Post, UseAuth, Status, Session, BodyParams,Required} from "@tsed/common";
import {AuthCheck} from "../guards/login.guard";
import { User, Users, UserBuilder } from '../entities/user.entity';
import * as session from 'express-session';
import { Conflict, NotFound } from "@tsed/exceptions";
import * as chalk from "chalk";
import { DAO_Utilisateur } from '../dao/utilisateurs.dao';
import { DAO_Role } from '../dao/roles.dao';
import { Roles } from "../entities/role.entity";
import { DBManager } from "src/dao";

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
  async login(@Required() @BodyParams("login") login: string, @Required() @BodyParams("password") pass: string, @Session("user") user: any, @Session() session: any) {
    console.log(`>>> Identification utilisateur (${login}, ${pass})`);
    try {
      const usr: User = await Users.login(login, pass);
      if (!(usr instanceof User)) throw new Error(`introuvable en bdd ${login}/${pass} : usr=${usr}`);
      console.log(chalk.inverse.green(">>> LOGIN/PASS VALIDE POUR L'UTILISATEUR : " + login))
      /** Mise a jour de la session coté serveur */
      const r = await usr.getRole();
      //console.log("role = ", r, usr)
      user.id = usr.getId();
      user.role = r.getRoleName();

      console.log("LOGIN OK ==> user = ", user)
      console.log("SESSION =  ", session)
      return JSON.stringify({ success:true, user: usr.getData(), role: user.role });
    } catch (error) {
      throw new NotFound("Unknown User : " + error);
    }    
  }


  @Post("/register")
  @Status(200, Boolean).Description("Success")
  async register(@Required() @BodyParams("pseudo") pseudo: string,
    @Required() @BodyParams("email") email: string,
    @Required() @BodyParams("mdp") mdp: string,
    @Required() @BodyParams("isabonne") isabonne: string,
    @Session("user") user: any) {
    console.log(`>>> Creation compte (${pseudo}, ${email}, ${mdp}, ${isabonne})`);
    try {
      const userDAO = new DAO_Utilisateur();

      const emailAlreadyTaken: boolean = (await userDAO.getByFieldValuePair('email', email) instanceof User);
      const pseudoAlreadyTaken: boolean = (await userDAO.getByFieldValuePair('pseudo', pseudo) instanceof User);
      if (emailAlreadyTaken) throw new Conflict(`Adresse email ${email} est indisponible`);
      if (pseudoAlreadyTaken) throw new Conflict(`Le pseudo ${pseudo} est indisponible`);

      const register = await userDAO.register({
        email: email,
        pseudo: pseudo,
        mdp: mdp,
        isabonne: isabonne
      })
      //console.log(insert)
      console.log("register = ", register)

      return true;
      
    } catch (error) {
      throw new NotFound("Erreur creation compte utilisateur : " + error);
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
  public check(@Session("user") user: any, @Session() sess: any) {
    return "OK !!!! : session =    " + JSON.stringify(sess)
  }

  @Get("/admin")
  @UseAuth(AuthCheck, {role: "admin"}) // check utilisateur admin
  public admincheck(@Session("user") user: any) {
    return "OK !!!! : user =    " + JSON.stringify(user)
  }
}