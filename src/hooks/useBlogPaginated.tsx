import { useState, useEffect, useCallback } from "react";
import { getBlogPaginated, BlogPaginationResponse } from "@/services/getBlogPaginated";

export function useBlogPaginated(page: number = 1) {
  const [data, setData] = useState<BlogPaginationResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (abort?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getBlogPaginated(page, abort);
      setData(result);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  return { data, loading, error, refetch };
}

