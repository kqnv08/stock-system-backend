import { IdentityRegisterStatusEnum } from "src/core/enums/identity-register-status.enum";
import { MetamapEventStatusNameEnum } from "src/core/enums/metamap-event-status-name.enum";
import { MetamapEventStatusEnum } from "src/core/enums/metamap-event-status.enum";

export const getVerificationStatusIdByStatusName = (name: string) => {
    switch (name) {
        case MetamapEventStatusNameEnum.VERIFIED:
            return MetamapEventStatusEnum.VERIFIED;

        case MetamapEventStatusNameEnum.REVIEW_NEEDED:
            return MetamapEventStatusEnum.REVIEW_NEEDED;

        case MetamapEventStatusNameEnum.REJECTED:
            return MetamapEventStatusEnum.REJECTED;

        default:
            return null;
    }
}

export const getIdentityRegisterStatusByStatusName = (name: string) => {
    switch (name) {
        case MetamapEventStatusNameEnum.VERIFIED:
            return IdentityRegisterStatusEnum.SUCCESS;

        case MetamapEventStatusNameEnum.REVIEW_NEEDED:
            return IdentityRegisterStatusEnum.VERIFICATION_IDENTITY_RETRY;

        case MetamapEventStatusNameEnum.REJECTED:
            return IdentityRegisterStatusEnum.VERIFICATION_IDENTITY_RETRY;

        default:
            return null;
    }
}

export const getRandomCuit = () => {
    let rand_cuit = "20" + String(Math.floor(Math.random() * (99999999 - 10000000)) + 10000000)
    let suma = 0;
    for (let i = 0; i < rand_cuit.length; i++) {
        const factor = rand_cuit.length - i + 1 > 7 ? (rand_cuit.length - i + 1) % 7 + 1 : rand_cuit.length - i + 1;
        suma += Number(rand_cuit[i]) * factor
    }
    const verif = (11 - suma % 11) % 11
    rand_cuit = rand_cuit + String(verif)
    return rand_cuit
}