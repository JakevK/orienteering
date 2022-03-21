import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const App = () => (
  <Router>
    <Switch>
      <Route path="/course" exact component={CoursePage} />
      <Route
        path="/rogaine"
        exact
        render={() => {
          window.location.href = "/rogaine";
        }}
      />
      <Route path="/" exact component={HomePage} />
      <Route path="/">
        <ErrorPage title="404" description="Page not found" />
      </Route>
    </Switch>
  </Router>
);

export default App;
