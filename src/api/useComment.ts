import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

import { END_POINT } from "@constants";

interface createComment {
  ip: string;
  rate: number;
  comment: string;
  accessoryId: number;
  averageRate: number;
}

export const fetchCommentList = async (accessoryId: number) => {
  const res = await request(
    END_POINT,
    gql`
      query Rate($where: RateWhereInput) {
        rates(where: $where) {
          ip
          rate
          comment
        }
      }
    `,
    {
      where: {
        accessoryId: {
          equals: accessoryId,
        },
      },
    }
  );
  return res;
};

export const createComment = async ({
  ip,
  rate,
  comment,
  accessoryId,
  averageRate = 0,
}: createComment) => {
  const res = await request(
    END_POINT,
    gql`
      mutation Mutation(
        $data: RateCreateInput!
        $updateAccessoryData2: AccessoryUpdateInput!
        $where: AccessoryWhereUniqueInput!
      ) {
        createRate(data: $data) {
          id
        }
        updateAccessory(data: $updateAccessoryData2, where: $where) {
          id
        }
      }
    `,
    {
      data: {
        accessory: {
          connect: {
            id: accessoryId,
          },
        },
        rate,
        comment,
        ip,
      },
      updateAccessoryData2: {
        averageRate: {
          set: averageRate,
        },
      },
      where: {
        id: accessoryId,
      },
    }
  );
  return res;
};

export const useCommentList = (accessoryId: number) => {
  return useQuery(
    ["commentList", accessoryId],
    () => fetchCommentList(accessoryId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
