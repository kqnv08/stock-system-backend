import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/role.decorator";
import { PayloadTokenInterface } from "../interfaces/token.interface";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const ctx = GqlExecutionContext.create(context)
    const roles: number[] = this.reflector.get<number[]>(ROLES_KEY, ctx.getHandler())

    if (roles) {
      const { req } = ctx.getContext();
      const user = req.user as PayloadTokenInterface
      const isAllowed = roles.some(r => r === user.roleId)
      if (!isAllowed) {
        throw new UnauthorizedException("not roles")
      }
      return isAllowed
    }
    return true
  }

}
