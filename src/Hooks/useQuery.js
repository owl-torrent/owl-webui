import { useEffect } from 'react';
import axios from 'axios';

const useQuery = ({ url, method, params, data }) => {
    const [statusCode, setStatusCode] = React.useState();
    const [apiData, setApiData] = React.useState();

    const options = {
        url,
        method,
        ...(params && { params }),
        ...(data && { data }),
    }

    useEffect(() => {
        axios(options).then(({ status, data }) => {
            setStatusCode(status)
            setApiData(data);
        });
    }, [url]);

    return { data: apiData, statusCode }
}