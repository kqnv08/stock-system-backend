import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core/lib';
import { Repository } from 'typeorm';
import { UserRegisterToken } from './entities/user-register-token.entity';

@Injectable()
export class UserRegisterTokenService extends BaseService<UserRegisterToken>{
  constructor(
    @InjectRepository(UserRegisterToken)
    private readonly engineRepository: Repository<UserRegisterToken>
  ) {
    super(engineRepository)

    this.modelClass = UserRegisterToken
  }

  async findByToken(token: string, email: string): Promise<UserRegisterToken> {
    return await this.engineRepository.findOne({
      where: {
        token: token,
        deletedAt: null,
        email: email
      }
    })
  }

  async findTokenByEmail(email: string): Promise<UserRegisterToken> {
    return await this.engineRepository.findOne({
      where: {
        email: email,
        deletedAt: null,
      }
    })
  }
}
