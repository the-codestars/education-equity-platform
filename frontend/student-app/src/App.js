import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import ViewAssignment from "./pages/ViewAssignment";
import Profile from "./pages/Profile";
import FindingMentor from "./pages/FindingMentor";
import Scholarships from "./pages/Scholarships";
import Forum from "./pages/Forum";
import Chatbot from "./pages/Chatbot";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/assignments" />} />
            <Route path="/assignments" element={<ViewAssignment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/finding-mentor" element={<FindingMentor />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default App;
