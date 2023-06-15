import { FormEvent, useState } from "react";
import Notification from "./Notification";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [klass, setKlass] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        navigate("/login");
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
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      <div className="flex items-center justify-center">
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
                  id="klass"
                  size="lg"
                  name="klass"
                  label="Kelas"
                  onChange={(e) => setKlass(e.target.value)}
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
                <Input
                  id="confirmPassword"
                  type="password"
                  size="lg"
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
                />
              </div>
              <Button className="mt-6" fullWidth type="submit">
                Sign up
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Sign In
                </Link>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
