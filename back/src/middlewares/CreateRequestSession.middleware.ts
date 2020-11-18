import {Middleware, Req} from "@tsed/common";



@Middleware()
export class CreateRequestSessionMiddleware {
  use(@Req() request) {
    if (request.session) {
      request.session.user = request.session.user || {
        id: null
      };
    }
  }
}