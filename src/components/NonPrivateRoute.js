import { Route, Redirect } from "react-router-dom";

export default function NonPrivateRoute({ children, ...rest }) {
    let auth = localStorage.getItem("authToken") ?? null
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/file",
              }}
            />
          )
        }
      />
    );
  }