import { useRef, useState } from "react";
import { User } from "../contexts/UserContext";
import Notification from "./Notification";

export const Login = ({
  setUser,
}: {
  setUser: (user: User | null) => void;
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      } else {
        const { message } = await res.json();
        setError(message);
      }
    });

    usernameRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      {error && (
        <Notification
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      <div className="flex flex-col justify-center items-center bg-[#F7EAE4] h-screen">
        <img src="/logo-1.jpg" alt="logo" className="w-48 h-48" />
        <form
          className="flex flex-col gap-4 w-full h-full px-8 max-w-md"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 border-gray-500 rounded-md p-2"
            ref={usernameRef}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-gray-500 rounded-md p-2"
            ref={passwordRef}
          />
          <button
            type="submit"
            className="bg-[#F7EAE4] border-2 border-gray-500 rounded-md p-2"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
