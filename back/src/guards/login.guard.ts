import {EndpointInfo, IMiddleware, Middleware, Req, Context, Session} from "@tsed/common";
import {Forbidden, Unauthorized} from "@tsed/exceptions";

@Middleware()
export class AuthCheck implements IMiddleware {
  public use(@Req() request: Req, @Context() ctx: Context, @Session("user") user) {
    // retrieve options given to the @UseAuth decorator
    const options = ctx.endpoint.get(AuthCheck) || {};


    if (!user || ! user.id) { // passport.js method to check auth
      throw new Unauthorized("Utilisateur non identifié : " + JSON.stringify(user));
    }

    console.log(">>>> access autorise utilisateur = ", JSON.stringify(user));

    if (options?.role && user.role !== options.role) {
      throw new Forbidden(`FORBIDDEN: vous devez disposer du role <${options.role}>. Vous etes actuellement <${user.role}>`);
    }
    
  }
}