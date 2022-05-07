import { Route, Redirect } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

export default function PrivateRoute({ children, ...rest }) {
    let auth = localStorage.getItem("authToken") ?? null
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signup",
              }}
            />
          )
        }
      />
    );
  }