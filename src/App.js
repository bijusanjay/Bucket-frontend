import "./App.css";
import Signup from "./Pages/Register/Signup";
import Signin from "./Pages/Login/Signin";
import Home from "./Pages/Home/Home";
import ListFiles from "./Pages/App/ListFiles";
import ManageFiles from "./Pages/App/ManageFiles";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute"
import NonPrivateRoute from "./components/NonPrivateRoute"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/file">
            <ListFiles />
          </PrivateRoute>

          <PrivateRoute exact path="/file/:fileId">
            <ManageFiles />
          </PrivateRoute>

          <NonPrivateRoute exact path="/">
            <Home />
          </NonPrivateRoute>

          <NonPrivateRoute path="/signup">
            <Signup />
          </NonPrivateRoute>

          <NonPrivateRoute path="/signin">
            <Signin />
          </NonPrivateRoute>

          <Route path="*">
            <Redirect to="/file" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
