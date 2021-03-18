import React from "react"
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom'
import { useApis } from '../contexts/provider'

type Props = Partial<RouteProps> & {
    children: JSX.Element
}

const StompRequiredRoute: React.FC<Props> = ({ children, ...rest }) => {
  let {apis: {isConnected}} = useApis();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isConnected ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/connect-api",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default StompRequiredRoute
