import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'roles'
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, true)
export const Roles = (...roles: number[]) => SetMetadata(ROLES_KEY, roles)
