import "./loginpage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[600px] mx-auto flex flex-col gap-8 items-center p-16">
      <h1>Register</h1>
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        placeholder="username"
        className="text-left p-2"
      />
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        placeholder="password"
        className="text-left p-2"
      />
      <button>Register</button>
      <div>
        Already have an account?{" "}
        <Link className="link" to="/login">
          click here to log in
        </Link>
      </div>
    </div>
  );
};
