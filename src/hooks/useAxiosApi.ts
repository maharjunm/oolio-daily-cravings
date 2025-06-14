import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
const useAxiosApi = (initialConfig = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(initialConfig);

  const fetchData = useCallback(
    async (newConfig = {}) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const requestConfig = { ...config, ...newConfig };

        const response = await axiosInstance(requestConfig);
        setData(response.data);
        return response.data;
      } catch (err: unknown) {
        setError(err as unknown as null);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  const refetch = useCallback(
    (newConfig = {}) => {
      setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
      fetchData({ ...config, ...newConfig });
    },
    [config, fetchData]
  );

  return { data, loading, error, fetchData, refetch };
};

export default useAxiosApi;
