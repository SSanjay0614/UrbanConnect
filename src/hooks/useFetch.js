import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function useFetch(url, { method = 'get', params, data, immediate = true } = {}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (override = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.request({ url, method, params, data, ...override });
      setResponse(res.data);
      return res.data;
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && url) execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { response, error, isLoading, execute };
}

