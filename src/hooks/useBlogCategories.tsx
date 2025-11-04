import { useState, useEffect, useCallback } from "react";
import { getBlogCategories, BlogCategory } from "@/services/getBlogCategories";

export function useBlogCategories(hideEmpty: boolean = true) {
  const [data, setData] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (abort?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getBlogCategories(hideEmpty, abort);
      setData(result);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [hideEmpty]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch };
}

