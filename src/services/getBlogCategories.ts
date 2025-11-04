import { axiosClient } from "@/api/axiosClient";

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export async function getBlogCategories(hideEmpty: boolean = true, signal?: AbortSignal): Promise<BlogCategory[]> {
  const { data } = await axiosClient.get<BlogCategory[]>("blog/categorias", {
    params: { hide_empty: hideEmpty ? 1 : 0 },
    signal,
  });
  return data;
}

