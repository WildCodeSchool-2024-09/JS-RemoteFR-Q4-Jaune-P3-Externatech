import axios from "axios";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgIcons from "../SvgIcons";
import SignUp from "./SignUp";
import "./login.css";

const icon = {
  visible: {
    width: "21px",
    height: "21px",
    path: "M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z",
  },
  notVisible: {
    width: "21px",
    height: "21px",
    path: "m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z",
  },
};

export default function Login({ isOpen, onClose }: LoginCompanyProps) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(() => null as string | null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const showIconPassword = showPassword ? icon.visible : icon.notVisible;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);

    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/login`, credentials, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.role === "candidate") {
            navigate("/candidates/dashboard");
          } else if (response.data.role === "company") {
            navigate("/companies/dashboard");
          }
        });
    } catch (err) {
      console.error("Request failed:", err);
      setError("Échec de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <dialog className="dialog_login" open={isOpen}>
      {isSignUp ? (
        <SignUp isOpen={isOpen} onClose={onClose} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>

          <p>Email</p>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <p>Mot de passe</p>
          <div className="password_input">
            <input
              className="input_password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="show_password"
            >
              <SvgIcons
                path={showIconPassword.path}
                height={showIconPassword.height}
                width={showIconPassword.width}
              />
            </button>
          </div>
          <div className="login_buttons">
            <button className="colored-box" type="submit">
              Se connecter
            </button>
            <button className="cancel-box" type="button" onClick={onClose}>
              Annuler
            </button>
            <div className="register_content">
              <p className="register_text">Pas encore de compte ?</p>
              <button
                className="register_button"
                type="button"
                onClick={() => setIsSignUp(true)}
              >
                S'inscrire
              </button>
            </div>
          </div>
          {error && <p className="messageError">{error}</p>}
        </form>
      )}
    </dialog>
  );
}
