import type { AxiosResponse } from "axios";
import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { IComment } from ".";
import { getError } from "@/lib/utils";

interface IFetchComments {
  page?: number;
  limit?: number;
  articleDocId?: string;
  populateUser?: boolean;
  content?: string;
}

const fetchComments = async ({
  page,
  limit,
  articleDocId,
  populateUser,
  content,
}: Partial<IFetchComments>) => {
  try {
    const response: AxiosResponse<IPaginateResponse<IComment>> = await API.get(
      "/comments",
      {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": limit,
          "filters[article][documentId][$eqi]": articleDocId || undefined,
          "filters[content][$containsi]": content || undefined,
          "populate[user]": populateUser ? "*" : undefined,
          "populate[article]": articleDocId ? "*" : undefined,
        },
      }
    );
    console.log(response.data.data);
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (err) {
    const message = getError(err);

    return { success: false, error: message };
  }
};

export const useFetchComments = ({
  page,
  limit,
  articleDocId,
  populateUser,
  content,
}: Partial<IFetchComments>) => {
  return useQuery({
    queryKey: ["comments", page, limit, articleDocId, populateUser, content],
    queryFn: () =>
      fetchComments({ page, limit, articleDocId, populateUser, content }),
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
  });
};
