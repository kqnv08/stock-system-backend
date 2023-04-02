import { GOAL_CATEGORIES } from "../enums/goal-category.enum";
import { GOAL_INSTRUMENTS } from "../enums/goal-intruments.enum";

interface GoalRecommendationCriteria {
  [categorySelector: string]: {
    [investorProfileSelector: string]: {
      [termSelector: string]: {
        [term: string]: (
          value: number
        ) => { PERCENTAGE: number; TICKER: string }[];
      };
    };
  };
}

export const GOAL_RECOMMENTATION_CRITERIA: GoalRecommendationCriteria = {
  [GOAL_CATEGORIES.EMERGENCY_FUND]: {
    CONSERVATIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
      },
    },
    MODERATE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
          },
        ],
      },
    },
    AGRESSIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) =>
          monthlyValue <= 10000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ]
            : [
                {
                  PERCENTAGE: 25,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 75,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ],
        MEDIUM_TERM: (monthlyValue) =>
          monthlyValue <= 10000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ]
            : [
                {
                  PERCENTAGE: 25,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 75,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ],
        LONG_TERM: (monthlyValue) =>
          monthlyValue <= 10000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ]
            : [
                {
                  PERCENTAGE: 25,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 75,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_AHORRO_PESOS,
                },
              ],
      },
    },
  },
  [GOAL_CATEGORIES.STUDY_FUND]: {
    CONSERVATIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ]
            : [
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 60,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ],
        MEDIUM_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ]
            : [
                {
                  PERCENTAGE: 60,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
              ],
        LONG_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ]
            : [
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
                {
                  PERCENTAGE: 30,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
                {
                  PERCENTAGE: 30,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ],
      },
    },
    MODERATE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ]
            : [
                {
                  PERCENTAGE: 20,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 80,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ],
        MEDIUM_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ]
            : [
                {
                  PERCENTAGE: 30,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
                {
                  PERCENTAGE: 70,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ],
        LONG_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ]
            : [
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
                {
                  PERCENTAGE: 20,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ],
      },
    },
    AGRESSIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
              ]
            : [
                {
                  PERCENTAGE: 20,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
                },
                {
                  PERCENTAGE: 80,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
                },
              ],
        MEDIUM_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ]
            : [
                {
                  PERCENTAGE: 60,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
                },
                {
                  PERCENTAGE: 40,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
                },
              ],
        LONG_TERM: (monthlyValue) =>
          monthlyValue <= 5000
            ? [
                {
                  PERCENTAGE: 100,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
                },
              ]
            : [
                {
                  PERCENTAGE: 70,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
                },
                {
                  PERCENTAGE: 30,
                  TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
                },
              ],
      },
    },
  },
  [GOAL_CATEGORIES.FIFA_WORLD_CUP_FUND]: {
    CONSERVATIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 100,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
      },
    },
    MODERATE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 35,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
          },
          {
            PERCENTAGE: 65,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
      },
    },
    AGRESSIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
      },
    },
  },
  [GOAL_CATEGORIES.CUSTOM_FUND]: {
    CONSERVATIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 80,
            TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
          },
          {
            PERCENTAGE: 20,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 65,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
          {
            PERCENTAGE: 35,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
      },
    },
    MODERATE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 65,
            TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
          },
          {
            PERCENTAGE: 35,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
          },
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RETORNO_TOTAL,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 60,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
          },
          {
            PERCENTAGE: 40,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
        ],
      },
    },
    AGRESSIVE: {
      TERMS: {
        SHORT_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_PESOS_PLUS,
          },
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
          },
        ],
        MEDIUM_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 65,
            TICKER: GOAL_INSTRUMENTS.ADCAP_RENTA_FIJA,
          },
          {
            PERCENTAGE: 35,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
        LONG_TERM: (monthlyValue) => [
          {
            PERCENTAGE: 30,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO_II,
          },
          {
            PERCENTAGE: 70,
            TICKER: GOAL_INSTRUMENTS.ADCAP_BALANCEADO,
          },
        ],
      },
    },
  },
};
