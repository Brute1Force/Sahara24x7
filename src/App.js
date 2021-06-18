// import logo from './logo.svg';
// import './App.css';

import NavbarComp from './Components/NavbarComp';
import DashboardComp from './Components/DashboardComp';
import FacilitiesSearchComp from './Components/FacilitiesSearchComp';
import HealthCareWorkersComp from './Components/HealthCareWorkersComp';
import HospitalsDetails from './Components/HospitalDetails';

// Routing
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComp />
      </div>

      {/* Routing */}
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <DashboardComp />}
        />
        <Route
          path="/search_facilities"
          exact
          render={(props) => <FacilitiesSearchComp />}
        />
        <Route
          path="/search_facilities/:id"
          exact
          render={(props) => <HospitalsDetails />}
        />
        <Route
          path="/healthcare_workers"
          exact
          render={(props) => <HealthCareWorkersComp />}
        />
      </Switch>

    </Router>
  );
}

export default App;
