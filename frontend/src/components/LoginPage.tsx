import "./loginpage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[600px] mx-auto flex flex-col gap-8 items-center p-16">
      <h1>Login</h1>
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
      <button>Login</button>
      <div>
        If you're new,{" "}
        <Link className="link" to="/register">
          click here to register
        </Link>
      </div>
    </div>
  );
};
