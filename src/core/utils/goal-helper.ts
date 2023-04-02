import { GOAL_INVESTOR_PROFILE } from "../enums/goal-investor-profile.enum";
import { GoalTermEnum } from "../enums/goal-term.enum";
import { InvestorProfileEnum } from "../enums/investor-profile.enum";

const MONTHS_TERM_LIMITS = {
  SHORT_TERM: {
    LOW: 0,
    HIGH: 17,
  },
  MEDIUM_TERM: {
    LOW: 18,
    HIGH: 35,
  },
  LONG_TERM: {
    LOW: 36,
    HIGH: undefined,
  },
};

const YEARS_TERM_LIMITS = {
  SHORT_TERM: {
    LOW: 0,
    HIGH: 3,
  },
  MEDIUM_TERM: {
    LOW: 4,
    HIGH: 7,
  },
  LONG_TERM: {
    LOW: 8,
    HIGH: undefined,
  },
};

export const getGoalInvestorProfile = (investorProfileId: number) => {
  if (investorProfileId === InvestorProfileEnum.VERY_CONSERVATIVE || investorProfileId === InvestorProfileEnum.CONSERVATIVE)
    return GOAL_INVESTOR_PROFILE.CONSERVATIVE;
  if (investorProfileId === InvestorProfileEnum.MODERATE) return GOAL_INVESTOR_PROFILE.MODERATE;
  if (investorProfileId === InvestorProfileEnum.RISKY || investorProfileId === InvestorProfileEnum.VERY_RISKY)
    return GOAL_INVESTOR_PROFILE.AGRESSIVE;
};

export const getGoalYearsTerm = (years: number) => {
  if (
    years >= YEARS_TERM_LIMITS.SHORT_TERM.LOW &&
    years <= YEARS_TERM_LIMITS.SHORT_TERM.HIGH
  )
    return GoalTermEnum.SHORT_TERM;
  if (
    years >= YEARS_TERM_LIMITS.MEDIUM_TERM.LOW &&
    years <= YEARS_TERM_LIMITS.MEDIUM_TERM.HIGH
  )
    return GoalTermEnum.MEDIUM_TERM;
  if (years >= YEARS_TERM_LIMITS.LONG_TERM.LOW) return GoalTermEnum.LONG_TERM;
};

export const getGoalMonthsTerm = (months: number) => {
  if (
    months >= MONTHS_TERM_LIMITS.SHORT_TERM.LOW &&
    months <= MONTHS_TERM_LIMITS.SHORT_TERM.HIGH
  )
    return GoalTermEnum.SHORT_TERM;
  if (
    months >= MONTHS_TERM_LIMITS.MEDIUM_TERM.LOW &&
    months <= MONTHS_TERM_LIMITS.MEDIUM_TERM.HIGH
  )
    return GoalTermEnum.MEDIUM_TERM;
  if (months >= MONTHS_TERM_LIMITS.LONG_TERM.LOW) return GoalTermEnum.LONG_TERM;
};
