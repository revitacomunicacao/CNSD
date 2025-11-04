import { axiosClient } from "@/api/axiosClient";

export interface BlogPostMin {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

export interface BlogCategoryInfo {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPaginationMeta {
  page: number;
  per_page: number;
  total_posts: number;
  total_pages: number;
}

export interface BlogByCategoryResponse {
  category: BlogCategoryInfo;
  pagination: BlogPaginationMeta;
  items: BlogPostMin[];
}

export async function getBlogByCategory(
  categorySlug: string,
  page: number = 1,
  perPage: number = 100,
  signal?: AbortSignal
): Promise<BlogByCategoryResponse> {
  const response = await axiosClient.get<BlogByCategoryResponse>(
    `blog/categoria/${categorySlug}`,
    {
      params: { page, per_page: perPage },
      signal,
    }
  );

  // Os headers também estão disponíveis se necessário
  const headers = response.headers || {};
  
  return response.data;
}

