import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import { Tag } from "../types/state";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery,
  tagTypes: ["tags"],
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], void>({
      query: () => "/tag",
    }),
    createTag: builder.mutation<void, Tag>({
      query: (tag) => ({
        url: "/tag",
        method: "POST",
        body: tag,
      }),
    }),
  }),
});

export const { useCreateTagMutation, useGetAllTagsQuery } = tagsApi;
