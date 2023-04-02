import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/core/lib";
import { getConnection, QueryRunner, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as moment from 'moment'
import * as bcrypt from 'bcrypt'
import { AdminChangePasswordDto, ConfirmationCodeInputDto, CreateByCodeDto, UserChangePasswordDto, UserInputDto, VerifyRegisterTokenInputDto } from "./dto/user.dto";
import { MAX_TOKEN_RANGE, MINUTES_TO_EXPIRATION, MIN_TOKEN_RANGE } from "src/core/config/register-token.config";
import { UserRegisterTokenService } from "../user-register-token/user-register-token.service";
import { UserRegisterTokenInputDto } from "../user-register-token/dto/user-register-token.dto";
import { UserRegisterToken } from "../user-register-token/entities/user-register-token.entity";
import { forwardRef, Module } from "@nestjs/common";
import { sendEmail } from '../../../core/lib/utils/emailer'
import { GenericResult } from "src/core/lib/interfaces/generic-result.interface";
import { RoleEnum } from "src/core/enums/role.enum";
import { RegisterStatusEnum } from "src/core/enums/register-status.enum";
import { ViewRenderHtmlPage } from "src/core/lib/html-render/html-render.class";
import { HtmlTemplateNamesEnum } from "src/core/enums/html-template-names.enum";
import { AuthService } from "src/core/lib/auth/services/auth.service";
import { Inject } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { PayloadTokenInterface } from "src/core/lib/auth/interfaces/token.interface";
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly engineRepository: Repository<User>,
    private userRegisterTokenService: UserRegisterTokenService,
    private readonly jwtService: JwtService
  ) {
    super(engineRepository)

    this.modelClass = User
  }

  async create(userInputDto: UserInputDto, connect: QueryRunner = null): Promise<User> {
    const queryRunner = connect ?? getConnection().createQueryRunner()

    try {
      if (!connect) await queryRunner.startTransaction()

      const payload = Object.assign(new User(), userInputDto)
      payload.password = await bcrypt.hash(userInputDto.password, 10)
      const result = await queryRunner.manager.save(payload) as User

      if (!connect) await queryRunner.commitTransaction()

      const { password, ...user } = result

      return user as User
    } catch (error) {
      console.log(error)
      // if (!connect)
      await queryRunner.rollbackTransaction()

    } finally {

      if (!connect) await queryRunner.release()
    }

  }

  async findByEmail(email: string): Promise<User> {
    return await this.engineRepository.findOne({ where: { email } })
  }

  async deactivateAccount(currentUser: any, userId: number): Promise<User> {
    const currentUserApiId: number = currentUser.sub

    if (currentUserApiId === userId) {

      const userId: number = currentUser.sub
      const result = await this.update(userId, { active: false, deletedAt: moment().format() }) as User

      return result
    }

    throw new UnauthorizedException("not allow!!")
  }

  async changePassword(userChangePasswordDto: UserChangePasswordDto, currentUser: any): Promise<GenericResult> {

    const userId: number = +currentUser.sub
    const { newPassword, oldPassword, repeatNewPassword } = userChangePasswordDto

    if (repeatNewPassword === newPassword) {

      const user: User = await this.findOne(userId)
      const isMatch = await bcrypt.compare(oldPassword, user.password)
      const equalOldAndNewPw = await bcrypt.compare(newPassword, user.password)

      if (isMatch) {
        if (equalOldAndNewPw) return { success: false, error: "La nueva contraseña no puede ser igual a la actual" }
        const hashNewPassword: string = await bcrypt.hash(newPassword, 10)
        const result = await this.update(+userId, { password: hashNewPassword }) as User
        const { password, ...user } = result
        return { success: true, successData: JSON.stringify(user) }
      }
      return { success: false, error: "Contraseña incorrecta" }
    }
    throw new ForbiddenException("New passwords must match")

  }

  async adminChangePassword(adminChangePasswordDto: AdminChangePasswordDto): Promise<GenericResult> {

    try {
      const { password, userId } = adminChangePasswordDto
      const hashNewPassword: string = await bcrypt.hash(password, 10)
      await this.update(+userId, { password: hashNewPassword })
      return { success: true }
    }
    catch (e) {
      console.log(e)
      return { success: false }
    }

  }

  async sendConfirmationCode(confirmationCodeInputDto: ConfirmationCodeInputDto): Promise<{ isSend: boolean }> {
    const queryRunner = getConnection().createQueryRunner()

    try {

      await queryRunner.startTransaction()
      let isSend = false
      const { email } = confirmationCodeInputDto

      const oldToken = await this.userRegisterTokenService.findTokenByEmail(email)
      if (oldToken) {
        await this.userRegisterTokenService.remove(oldToken.id, queryRunner)
      }
      const newToken: number = await this.generateToken(email)
      const expirationDate = new Date()
      expirationDate.setHours(expirationDate.getHours(), expirationDate.getMinutes() + MINUTES_TO_EXPIRATION)

      const payloadToken: UserRegisterTokenInputDto = {
        email: email,
        expirationDate: expirationDate,
        token: newToken.toString()
      }
      const token: UserRegisterToken = await this.userRegisterTokenService.create(payloadToken, queryRunner) as UserRegisterToken
      const html = ViewRenderHtmlPage.renderMail(HtmlTemplateNamesEnum.REGISTER_VERIFY_TOKEN, {
        email,
        token: token.token
      })
      isSend = await sendEmail({ email, html, subject: "Codigo de Verificación" })

      await queryRunner.commitTransaction()

      return { isSend }

    } catch (error) {

      console.log(error)

      await queryRunner.rollbackTransaction()

    } finally {

      await queryRunner.release()
    }
  }

  async generateToken(email: string): Promise<number> {

    let generateToken = false
    let token: number

    while (!generateToken) {
      token = Math.floor(Math.random() * (MAX_TOKEN_RANGE - MIN_TOKEN_RANGE)) + MIN_TOKEN_RANGE
      const result = await this.userRegisterTokenService.findByToken(token.toString(), email)

      if (!result) {
        generateToken = true
      }
    }
    return token
  }

  async verifyToken(verifyRegisterTokenInputDto: VerifyRegisterTokenInputDto): Promise<GenericResult> {

    try {
      const { email, token } = verifyRegisterTokenInputDto
      const user = await this.findByEmail(verifyRegisterTokenInputDto.email)
      if (user) throw new ForbiddenException("email duplicated!")
      const result = await this.userRegisterTokenService.findByToken(token, email)
      const date = new Date().getTime()
      if (!result) {
        throw new ForbiddenException("wrong token!")
      }

      await this.userRegisterTokenService.remove(result.id)

      if (date > result.expirationDate.getTime()) {
        throw new ForbiddenException("token is expired!")
      }
      return { success: true }
    } catch (error) {
      console.log("error", error)
      return { success: false, error: error.message }
    }

  }

  async createByCode(createByCodeDto: CreateByCodeDto, connect: QueryRunner = null): Promise<GenericResult> {
    const queryRunner = connect ?? getConnection().createQueryRunner()

    try {
      if (!connect) await queryRunner.startTransaction()

      const verifyCodeResult = await this.verifyToken({ email: createByCodeDto.email, token: createByCodeDto.code })

      if (!verifyCodeResult.success) return verifyCodeResult

      const result = await this.create({ password: createByCodeDto.password, email: createByCodeDto.email, roleId: RoleEnum.INVESTOR, active: true }, queryRunner)

      if (!connect) await queryRunner.commitTransaction()

      return { success: true }

    } catch (error) {

      console.log("error", error)
      await queryRunner.rollbackTransaction()

      return { success: false, error: error.message }

    } finally {

      if (!connect) await queryRunner.release()
    }
  }

  // async getRegisterStatus(user: any): Promise<number> {
  //   try {
  //     const currentUser = await this.findOne(user?.sub)
  //     if (currentUser.roleId != RoleEnum.INVESTOR) return RegisterStatusEnum.FINISHED
  //     if (!currentUser?.customer) return RegisterStatusEnum.PERSONAL_DATA

  //     return Number((await currentUser.customer)?.registerStatusId ?? RegisterStatusEnum.PERSONAL_DATA)
  //   } catch (error) {
  //     console.log("error", error)

  //   }

  // }

  async existEmail(email: string): Promise<GenericResult> {
    try {
      const result = await this.engineRepository.findOne({ where: { email } })
      if (result) {
        return { success: true, successData: JSON.stringify({ userId: result.id }) }
      } else {
        return { success: false, error: 'El mail ingresado no coincide con ningún usuario registrado en Poncho Capital' }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // async recoverPassword(email: string): Promise<GenericResult> {
  //   try {
  //     const user = await this.engineRepository.findOne(null, { where: { email } })
  //     if (!user) return { success: false, error: "Not found user" }
  //     const payload: PayloadTokenInterface = { roleId: user.roleId, sub: user.id }
  //     const access_token = this.jwtService.sign(payload)
  //     const html = ViewRenderHtmlPage.renderMail(HtmlTemplateNamesEnum.RECOVER_PASSWORD, {
  //       email,
  //       token: process.env.FRONT_WEB_BASE_URL + "/recovery?token=" + access_token
  //     })
  //     const isSend = await sendEmail({ email, html, subject: "Recuperación de contraseña" })
  //     return { success: isSend }
  //   } catch (error) {
  //     return { success: false }
  //   }
  // }
  // async changePasswordByRecoverPassword(newPassword: string, userId: string | number): Promise<GenericResult> {
  //   try {
  //     const user = await this.engineRepository.findOne(userId)
  //     if (!user) return { success: false, error: "Not found user" }
  //     const hashNewPassword: string = await bcrypt.hash(newPassword, 10)
  //     await this.update(+userId, { password: hashNewPassword }) as User

  //     return { success: true }
  //   } catch (error) {
  //     return { success: false }
  //   }
  // }

  async banUser(userId: number): Promise<GenericResult> {
    try {

      const { enabled } = await this.findOne(userId)
      await this.update(userId, { enabled: !enabled })

      return { success: true }

    } catch (e) {
      return { success: false, error: e }
    }

  }
}
