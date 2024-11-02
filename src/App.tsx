import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { RootState } from "./redux/store";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Dashboard = React.lazy(() => import("./pages/DashboardPage"));

interface PrivateRouteProps {
  children: React.ReactNode;
}

//Private Route for authenticated users
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
