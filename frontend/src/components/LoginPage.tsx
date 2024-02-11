import "./loginpage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { tryLogin } from "../api/index";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: tryLogin,
    onSuccess: () => {
      navigate("/forum");
    }
  })
  const login = () => {
    mutation.mutate({ username, password })     
  }
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
      <button onClick={login}>Login</button>
      <div>
        If you're new,{" "}
        <Link className="link" to="/register">
          click here to register
        </Link>
      </div>
    </div>
  );
};
