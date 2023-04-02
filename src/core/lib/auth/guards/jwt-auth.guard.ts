import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, ctx.getHandler())
    if (isPublic) {
      return true
    }
    const { req, extra } = ctx.getContext();
    const jwtService: JwtService = new JwtService()
    if (extra) return Boolean(jwtService.verify(extra?.authorization, { secret: process.env.JWT_SECRET }))
    return super.canActivate(new ExecutionContextHost([req]))
  }

}
