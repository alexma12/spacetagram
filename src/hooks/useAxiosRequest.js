import { useEffect, useState } from "react";
import axios from "axios";

const useAxiosRequest = ({ method, url, data = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method,
      url,
      data,
      headers,
    })
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return [response, error];
};

export default useAxiosRequest;
