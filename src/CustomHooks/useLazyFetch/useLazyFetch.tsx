import { useEffect, useState } from "react";

/**
 *
 */

type Response = {
  responseData: object | null;
  responseStatus: number;
  responseType: string;
};

const useLazyFetch = (
  url: string,
  options: RequestInit | undefined = {},
  dependencies = [],
  initiateFetch: boolean,
  retry: number = 1
) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<Response | null>(null);

  useEffect(() => {
    if (!initiateFetch) return;
    const fetchData = async () => {
      for (let i = 0; i < retry; i++) {
        try {
          setLoading(true);
          const response = await fetch(url, options);
          if (!response.ok) {
            setError({
              responseData: null,
              responseStatus: response.status,
              responseType: response.type,
            });
          } else {
            const result = await response.json();
            setData({
              responseData: result,
              responseStatus: response.status,
              responseType: response.type,
            });
            return;
          }
        } catch (e) {
          setError({
            responseData: e ?? {},
            responseStatus: e.status || 0,
            responseType: e.type || "--unknown error occured--",
          });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [url, ...dependencies, initiateFetch, options]);

  return { data, error, isLoading };
};

export default useLazyFetch;
