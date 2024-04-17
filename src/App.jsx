  import React, { useState, useContext } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { Container, Navbar, Nav } from "react-bootstrap";
  import {
    BrowserRouter,
    Route,
    Routes,
    Outlet,
    useNavigate,
  } from "react-router-dom";
  import Login from "./pages/Login";
  import Logout from "./pages/Logout";
  import Dashboard from "./pages/Dashboard";
  import CreateBudget from "./pages/CreateBudget";
  import RequireAuth from "./component/RequireAuth";
  import { ThemeProvider, useTheme } from './ThemeProvider';
  import { AuthContext } from "./AuthContext";

  function Layout() {
    const navigate = useNavigate(); 
    const { setToken } = useContext(AuthContext); 
    const logout = () => {
      setToken(null); 
      navigate("/login");
    }
    const theme = useTheme();
    const handleThemeChange = () => {
      theme.toggleTheme();
    }

    return (
      <>
        <Navbar bg="dark" variant="dark">
          <>
            <Navbar.Brand href="/">Checkyourbudget.com</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
              <input
                type="checkbox"
                checked={theme.theme === "dark"}
                onChange={handleThemeChange}
              />
              <h1>Use dark mode</h1>
            </Nav>
          </>
        </Navbar>
        <Outlet />
      </>
    );
  }

  export default function App() {
    const [token, setToken] = useState(null);

    return (
      <ThemeProvider> {/* Wrap your application with ThemeProvider */}
        <AuthContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/createbudget" element={<CreateBudget />} />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                {/* <Route index element={<ThemeMode />} /> */}
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    );
  }
