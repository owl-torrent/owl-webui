import {AxiosError} from 'axios'

export interface ApiError {
  message: string
}

export const normalizeError = (error: any): ApiError => {
  if (isAxiosError(error)) {
    if (error.response) {
      console.log(`Request failed with status code ${error.response.status}: ${error.message}; request is ${error.request}; response is ${error.response.data}`)
      return {message: `${error.response.status}: ${error.message}`}
    } else if (error.request) {
      console.log(`No response received from the server: ${error.request}`)
      return {message: 'no response received from the server'}
    }
    return {message: `${error.name}: ${error.message}`}
  } else if (error instanceof Error) {
    return {message: `${error.name}: ${error.message}`}
  } else {
    return {message: error}
  }
}


const isAxiosError = (error: any): error is AxiosError<any> => {
  return 'isAxiosError' in error
}
