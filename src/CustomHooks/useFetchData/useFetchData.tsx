import { useMemo, useState } from "react";
import { useEffect } from "react";

/**
 * 1) basic api calling/response
 * 2) error handling
 * 3) loading features
 */

type Response = {
  responseType: string;
  status: number;
  data: object | null;
}

type UseFetchType = {
  data: Response | null;
  error: Response | null;
  isLoading: boolean;
}

const useFetchData = (url = "", options: RequestInit = {}, dependency = []): UseFetchType => {
  const [data, setData] = useState<Response | null>(null);
  const [error, setError] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   // Clear the previous request if dependency changes
    setError(null);
    setData(null);
    const getData = async() => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if(!response.ok) {
          setError({
            responseType: "error",
            status: response.status,
            data: null,
          });
        } else {
          const result = await response.json();
          setData({
            responseType: "success",
            status: response.status,
            data: result,
          })
        }
      } catch (e) {
        setError({
          responseType: "error",
          status: e.status ?? 0,
          data: e.message ?? "Unknown error",
        });
      }
      finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url, ...dependency, options])

  return {data, error, isLoading};
};

export default useFetchData;
