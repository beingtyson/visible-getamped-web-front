import { useInfiniteQuery } from "react-query";
import { request, gql } from "graphql-request";

import { END_POINT } from "@constants";

interface fetchAccessoriesArgs {
  lastId?: number;
  filterData: object;
}
export const fetchAccessories = async ({
  lastId = 0,
  filterData,
}: fetchAccessoriesArgs) => {
  const res = await request(
    END_POINT,
    gql`
      query Accessories(
        $take: Int
        $skip: Int
        $where: AccessoryWhereInput
        $cursor: AccessoryWhereUniqueInput
        $orderBy: [AccessoryOrderByWithRelationInput!]
      ) {
        accessories(
          take: $take
          skip: $skip
          where: $where
          cursor: $cursor
          orderBy: $orderBy
        ) {
          id
          code
          regDate
          img
          price
          priceType
          name
          statImg
          detailDescription
          detailCommand
          availableCharacter
          averageRate
        }
      }
    `,
    {
      take: 100,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
      ...filterData,
    }
  );
  return res;
};

export const useAccessories = ({ filterData }: fetchAccessoriesArgs) => {
  return useInfiniteQuery(
    ["accessories", JSON.stringify(filterData)],
    ({ pageParam }) => fetchAccessories({ lastId: pageParam, filterData }),
    {
      getNextPageParam: (lastPage: any) => {
        const { accessories } = lastPage;
        return accessories[accessories.length - 1]?.id;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
