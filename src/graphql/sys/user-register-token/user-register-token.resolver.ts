import { Resolver } from '@nestjs/graphql';
import { UserRegisterToken } from './entities/user-register-token.entity';

@Resolver(() => UserRegisterToken)
export class UserRegisterTokenResolver { }
