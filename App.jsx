import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectRoute";

import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import FinancialHabitsPage from "./pages/FinancialHabits/FinancialHabitsPage";
import SavingsGoals from "./pages/SavingsGoals/SavingsGoals";
import Investments from "./pages/Investments/Investments";
import WealthAnalytics from "./pages/WealthAnalytics/WealthAnalytics";
import Reports from "./pages/Reports/Reports";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            AUTHENTICATION PAGES
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            PROTECTED DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Dashboard />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            TRANSACTIONS
        ========================= */}

        <Route
          path="/transactions"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Transactions />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            FINANCIAL HABITS
        ========================= */}

        <Route
          path="/financial-habits"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <FinancialHabitsPage />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            SAVINGS GOALS
        ========================= */}

        <Route
          path="/savings-goals"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <SavingsGoals />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            INVESTMENTS
        ========================= */}

        <Route
          path="/investments"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Investments />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            WEALTH ANALYTICS
        ========================= */}

        <Route
          path="/wealth-analytics"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <WealthAnalytics />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            REPORTS
        ========================= */}

        <Route
          path="/reports"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Reports />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            PROFILE
        ========================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Profile />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            SETTINGS
        ========================= */}

        <Route
          path="/settings"
          element={
            <ProtectedRoutes>
              <div className="app-layout">
                <Sidebar />

                <main className="main-content">
                  <Settings />
                </main>
              </div>
            </ProtectedRoutes>
          }
        />


        {/* =========================
            DEFAULT ROUTES
        ========================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;