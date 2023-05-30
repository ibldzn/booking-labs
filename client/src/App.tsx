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
import { Lab, LabProps } from "./components/Lab";
import { LabsContext } from "./contexts/LabsContext";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [labs, setLabs] = useState<LabProps[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/me`, {
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
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/labs`)
      .then((res) => res.json())
      .then((data) => setLabs(data));
  }, []);

  return (
    <Router>
      <UserContext.Provider value={user}>
        <LabsContext.Provider value={labs}>
          <div className="bg-[#F7EAE4] min-w-screen min-h-screen">
            <Navbar setUser={setUser} />
            <Routes>
              <Route path="/" element={<LabsActivity />} />
              <Route path="/activities" element={<LabsActivity />} />
              <Route
                path="/login"
                element={
                  user ? <Navigate to="/" /> : <Login setUser={setUser} />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/labs/:id" element={<Lab />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </LabsContext.Provider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
