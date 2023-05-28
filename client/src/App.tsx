import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { User, UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import { Register } from "./components/Register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LabsActivity } from "./components/LabsActivity";
import { Lab } from "./components/Lab";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/me`, {
      signal,
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div className="w-screen h-screen">
        <Navbar />
        <div className="bg-[#F7EAE4] w-full h-full flex justify-center">
          <Router>
            <Routes>
              <Route path="/" element={<LabsActivity />} />
              <Route
                path="/login"
                element={
                  user ? <Navigate to="/" /> : <Login setUser={setUser} />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/labs/:id" element={<Lab />} />
            </Routes>
          </Router>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
