import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user
    }
    const ctx = GqlExecutionContext.create(context)
    const getContext = ctx.getContext()
    if (getContext.req) return getContext.req.user
    const jwtService = new JwtService()
    const user = jwtService.verify(getContext.extra.authorization, { secret: process.env.JWT_SECRET })
    return user
  }
)
