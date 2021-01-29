import { useEffect } from "react";
import axios from "axios";
import { type } from "os";
import React from "react";

enum Methods {
  GET = "GET",
  POST = "POST",
}

interface QueryParams {
  url: string;
  method: Methods;
  params: Object;
  data: Object;
}

interface QueryResponse {
  data: object;
  statusCode: number;
}

const useQuery = ({
  url,
  method,
  params,
  data,
}: QueryParams): QueryResponse => {
  const [statusCode, setStatusCode] = React.useState(0);
  const [apiData, setApiData] = React.useState({});

  const options = {
    url,
    method,
    ...(params && { params }),
    ...(data && { data }),
  };

  useEffect(() => {
    axios(options).then(({ status, data }) => {
      setStatusCode(status);
      setApiData(data);
    });
  }, [url]);

  return { data: apiData, statusCode };
};

export default useQuery;
