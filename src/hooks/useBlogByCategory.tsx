import { useState, useEffect, useCallback } from "react";
import { getBlogByCategory, BlogByCategoryResponse } from "@/services/getBlogByCategory";

export function useBlogByCategory(categorySlug: string, page: number = 1, perPage: number = 100) {
  const [data, setData] = useState<BlogByCategoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (abort?: AbortSignal) => {
    if (!categorySlug) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await getBlogByCategory(categorySlug, page, perPage, abort);
      setData(result);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [categorySlug, page, perPage]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch };
}

