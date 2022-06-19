export const END_POINT: string =
  "https://43su3fyeyk.execute-api.ap-northeast-2.amazonaws.com/prod/graphql";
export const GOOGLE_MESAUREMENT_ID = "G-GPY3R0W0CX";

export const FILTER_KEY = {
  RECENT: "RECENT",
  RATE: "RATE",
  EPIC: "EPIC",
  SEARCH: "SEARCH",
};

export const FILTER_MAP = {
  [FILTER_KEY.RECENT]: {
    orderBy: [
      {
        id: "desc",
      },
    ],
  },
  [FILTER_KEY.RATE]: {
    orderBy: [
      {
        averageRate: "desc",
      },
    ],
  },
  [FILTER_KEY.EPIC]: {
    where: {
      code: {
        contains: "epic",
      },
    },
  },
};
