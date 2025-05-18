import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../../app/api";
import { Tag } from "../types/state";

// Define more specific response type for createTag
export interface TagResponse extends Tag {
  _id: string;
  tag: string;
  __v?: number;
  user?: string;
}

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery,
  tagTypes: ["tags"],
  endpoints: (builder) => ({
    getAllTags: builder.query<Tag[], void>({
      query: () => "/tag",
      providesTags: ["tags"]
    }),
    createTag: builder.mutation<TagResponse, Tag>({
      query: (tag) => ({
        url: "/tag",
        method: "POST",
        body: tag,
      }),
      // Invalidate tags cache after creating a new tag
      invalidatesTags: ["tags"]
    }),
  }),
});

export const { useCreateTagMutation, useGetAllTagsQuery } = tagsApi;
