import { useState } from "react";
import { User } from "../contexts/UserContext";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";

export const Login = ({
  setUser,
}: {
  setUser: (user: User | null) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill all the fields");
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

    setUsername("");
    setPassword("");
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
      <Card color="transparent" shadow={false}>
        <CardHeader
          className="flex flex-col items-center justify-center"
          color="transparent"
          shadow={false}
          floated={false}
        >
          <img
            src="/logo-1.jpg"
            alt="logo"
            className="w-48 h-48 object-cover"
          />
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <form
            className="mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                id="username"
                size="lg"
                name="username"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
              <Input
                id="password"
                type="password"
                size="lg"
                name="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <Button className="mt-6" fullWidth type="submit">
              Sign in
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign Up
              </Link>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </>
  );
};
