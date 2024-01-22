import { AxiosError } from "axios";
import { BaseResponse, axiosInstance } from "../../../common/api";
import {
  CreateBlogEntryBody,
  GetBlogEntryResponse,
  ListBlogEntriesBody,
  ListBlogEntriesResponse,
} from "../interfaces";

export const listBlogEntriesService = async (data?: ListBlogEntriesBody) => {
  try {
    const response = await axiosInstance.get<
      BaseResponse<ListBlogEntriesResponse>
    >(
      data
        ? `blog?searchValue=${data.searchValue}&searchCriteria=${data.searchCriteria}`
        : "blog"
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse<ListBlogEntriesResponse>>;
    return err.response!.data;
  }
};

export const createBlogEntryService = async (data: CreateBlogEntryBody) => {
  try {
    const token = localStorage.getItem("@auth-token");
    const response = await axiosInstance.post<BaseResponse>("blog", data, {
      headers: { "auth-token": token },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse>;
    return err.response!.data;
  }
};

export const getBlogEntryService = async (entryId: string) => {
  try {
    const token = localStorage.getItem("@auth-token");
    const response = await axiosInstance.get<
      BaseResponse<GetBlogEntryResponse>
    >(`blog/${entryId}`, {
      headers: { "auth-token": token ?? undefined },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse<GetBlogEntryResponse>>;
    return err.response!.data;
  }
};

export const toggleBlogEntryLikeService = async (blog_entry_id: string) => {
  try {
    const token = localStorage.getItem("@auth-token");
    const response = await axiosInstance.post<BaseResponse>(
      "blog_like",
      { blog_entry_id },
      { headers: { "auth-token": token } }
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<BaseResponse>;
    return err.response!.data;
  }
};
