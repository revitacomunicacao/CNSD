import { axiosClient } from "@/api/axiosClient";

export interface BlogPostMin {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

export interface BlogPaginationResponse {
  posts: BlogPostMin[];
  total: number;
  totalPages: number;
  perPage: number;
}

export async function getBlogPaginated(page: number = 1, signal?: AbortSignal): Promise<BlogPaginationResponse> {
  const response = await axiosClient.get<BlogPostMin[]>("blog/paginado", {
    params: { page },
    signal,
  });

  const headers = response.headers || {};
  const total = headers["x-wp-total"] || headers["X-WP-Total"] || "0";
  const totalPages = headers["x-wp-totalpages"] || headers["X-WP-TotalPages"] || "0";
  const perPage = headers["x-wp-perpage"] || headers["X-WP-PerPage"] || "10";

  return {
    posts: response.data,
    total: parseInt(String(total), 10),
    totalPages: parseInt(String(totalPages), 10),
    perPage: parseInt(String(perPage), 10),
  };
}

export async function getBlogPaginationInfo(signal?: AbortSignal): Promise<{ total_posts: number; per_page: number; total_pages: number }> {
  const { data } = await axiosClient.get<{ total_posts: number; per_page: number; total_pages: number }>("blog/paginacao", { signal });
  return data;
}

