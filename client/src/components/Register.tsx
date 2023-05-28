import { FormEvent, useRef, useState } from "react";
import Notification from "./Notification";

export const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const klassRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const klass = klassRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!username || !password || !klass || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, klass }),
    }).then(async (res) => {
      if (res.ok) {
        // window.location.href = "/login";
        console.log("Successfully registered");
      } else {
        const { message } = await res.json();
        setError(message);
      }
    });
  };

  return (
    <>
      {error && (
        <Notification
          type="warning"
          message={error}
          onClose={() => setError("")}
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
            required={true}
          />
          <label htmlFor="password">Kelas</label>
          <input
            type="text"
            name="klass"
            id="klass"
            className="border-2 border-gray-500 rounded-md p-2"
            ref={klassRef}
            required={true}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-gray-500 rounded-md p-2"
            ref={passwordRef}
            minLength={8}
            required={true}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            className="border-2 border-gray-500 rounded-md p-2"
            ref={confirmPasswordRef}
            minLength={8}
            required={true}
          />
          <button
            type="submit"
            className="bg-[#F7EAE4] border-2 border-gray-500 rounded-md p-2"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
