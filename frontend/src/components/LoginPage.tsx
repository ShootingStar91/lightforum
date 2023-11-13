import "./loginpage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[600px] mx-auto flex flex-col gap-8 items-center p-24">
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
        value={username}
        placeholder="username"
      />
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        placeholder="password"
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
