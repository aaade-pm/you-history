import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import useAuth from "./hooks/auth/useAuth";

const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Dashboard = React.lazy(() => import("./pages/DashboardPage"));

interface PrivateRouteProps {
  children: React.ReactNode;
}

//Private Route for authenticated users
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
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
